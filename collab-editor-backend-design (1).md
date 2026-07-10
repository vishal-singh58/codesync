# Real-Time Collaborative Code Editor — Backend Architecture

## 1. System Design Overview

```
                        ┌─────────────────────┐
                        │   Load Balancer      │
                        │  (Nginx / ALB)       │
                        └──────────┬───────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
      ┌───────▼───────┐   ┌───────▼───────┐   ┌───────▼───────┐
      │  Node Server 1 │   │  Node Server 2 │   │  Node Server N │
      │  (Socket.io +  │   │  (Socket.io +  │   │  (Socket.io +  │
      │   Express API) │   │   Express API) │   │   Express API) │
      └───────┬────────┘   └───────┬────────┘   └───────┬────────┘
              │                    │                    │
              └──────────┬─────────┴──────────┬─────────┘
                         │                    │
              ┌──────────▼──────────┐  ┌──────▼───────────┐
              │  Redis (Pub/Sub +   │  │  MongoDB/Postgres │
              │  Adapter for        │  │  (rooms, users,   │
              │  Socket.io scaling, │  │  doc snapshots,   │
              │  presence, cache)   │  │  chat history)     │
              └──────────────────────┘  └───────────────────┘
                         │
              ┌──────────▼──────────┐
              │  y-websocket / Yjs   │
              │  document persistence │
              │  (y-leveldb / y-redis)│
              └───────────────────────┘
```

**Key idea:** The hard part of this project isn't "send edits over a socket" — it's **conflict-free merging** when multiple people type at the same time. That's what CRDTs (via Yjs) solve for you. Your backend's job is mostly *transport + persistence + auth + presence*, not writing your own OT algorithm (don't reinvent that — Yjs is battle-tested).

---

## 2. Core Concepts You're Implementing

| Concept | How it's handled |
|---|---|
| CRDT / Conflict resolution | `Yjs` document (`Y.Doc`) — each client has a local replica, changes are merged automatically via CRDT algorithm |
| Real-time transport | `Socket.io` for chat/presence/cursors, OR `y-websocket` protocol specifically for Yjs sync (recommended: separate concerns) |
| Persistence | Periodically snapshot the Yjs document state (binary `Uint8Array`) to DB so reloading a room restores content |
| Presence | Redis-backed active-user set per room, broadcast on join/leave |
| Cursor tracking | Yjs Awareness protocol (`y-protocols/awareness`) — built for exactly this, don't roll your own |
| Room sharing | Room = unique ID (nanoid), stored in DB with metadata + permissions |
| AI autocomplete | Separate REST endpoint hitting an LLM API, debounced client-side, returns ghost-text suggestions |

**Important architectural decision:** Use **two real-time channels**, not one:
1. **Yjs sync channel** (`y-websocket` provider or Yjs's `y-socket.io`) — purely for document CRDT updates. Binary, high-frequency, don't mix with chat.
2. **Socket.io channel** — for chat, presence, notifications, room events. JSON, lower-frequency.

Mixing these leads to messy code. Keep document sync isolated.

---

## 3. Backend Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── env.js                 # env var loader/validator
│   │   ├── redis.js               # redis client setup
│   │   └── db.js                  # MongoDB/Postgres connection
│   │
│   ├── models/
│   │   ├── Room.js                # room schema: id, name, owner, createdAt, settings
│   │   ├── User.js                # user schema (if auth enabled)
│   │   ├── DocumentSnapshot.js    # binary Yjs state + version + roomId
│   │   └── ChatMessage.js         # roomId, userId, text, timestamp
│   │
│   ├── sockets/
│   │   ├── index.js               # socket.io init, attaches all handlers
│   │   ├── handlers/
│   │   │   ├── connectionHandler.js
│   │   │   ├── presenceHandler.js  # join/leave, active users list
│   │   │   ├── chatHandler.js
│   │   │   ├── cursorHandler.js    # broadcast cursor/selection (if not using Yjs awareness)
│   │   │   └── roomHandler.js      # create/join/leave room events
│   │   └── middleware/
│   │       └── socketAuth.js       # verify JWT on socket handshake
│   │
│   ├── yjs/
│   │   ├── setupWSConnection.js    # y-websocket server setup, or y-socket.io integration
│   │   ├── persistence.js          # debounced save Y.Doc state to DB
│   │   └── docManager.js           # in-memory map of roomId -> Y.Doc instances
│   │
│   ├── routes/
│   │   ├── roomRoutes.js           # REST: create room, get room info, list rooms
│   │   ├── authRoutes.js           # login/signup/guest tokens
│   │   ├── aiRoutes.js             # POST /api/ai/autocomplete
│   │   └── chatRoutes.js           # GET chat history for a room
│   │
│   ├── controllers/
│   │   ├── roomController.js
│   │   ├── authController.js
│   │   ├── aiController.js
│   │   └── chatController.js
│   │
│   ├── services/
│   │   ├── redisPresenceService.js # sadd/srem/smembers active users per room
│   │   ├── aiService.js            # calls Claude/OpenAI API for completions
│   │   ├── snapshotService.js      # save/load Yjs binary state
│   │   └── roomService.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js          # important for AI endpoint especially
│   │
│   ├── utils/
│   │   ├── generateRoomId.js       # nanoid-based
│   │   └── logger.js
│   │
│   ├── app.js                      # express app setup
│   └── server.js                   # http server + socket.io attach + listen
│
├── .env
├── package.json
└── Dockerfile
```

---

## 4. How the Yjs + Socket.io Wiring Actually Works

You have two solid options — pick one, don't hybrid it awkwardly:

**Option A (recommended, simpler): `y-socket.io`**
This is a community package that runs Yjs sync *through* your existing Socket.io connection, so you get one connection per client instead of two.

```js
// server.js
const { Server } = require('socket.io');
const { setupYSocketIO } = require('y-socket.io/dist/server');

const io = new Server(httpServer, { cors: { origin: '*' } });

setupYSocketIO(io, {
  authenticate: (auth) => verifyJWT(auth.token), // gate room access
  persistence: {
    bindState: async (docName, ydoc) => {
      const saved = await snapshotService.load(docName);
      if (saved) Y.applyUpdate(ydoc, saved);
    },
    writeState: async (docName, ydoc) => {
      await snapshotService.save(docName, Y.encodeStateAsUpdate(ydoc));
    },
  },
});
```

**Option B: standalone `y-websocket` server** on a separate port/path, Socket.io on another. More moving parts but cleanly decoupled — better if this scales into a "real" product later.

Either way, the pattern is the same:
1. Client connects → joins room → gets current `Y.Doc` state (either full state or diff)
2. Client edits locally → Yjs computes update → broadcast to room via server → other clients merge automatically
3. Server periodically persists document state (don't persist on every keystroke — debounce, e.g., every 2–5 seconds or N updates)

---

## 5. Presence & Cursor Tracking

Don't build cursor broadcasting from scratch — use **Yjs Awareness**, which is designed exactly for ephemeral state like cursors, selections, and user metadata (name, color).

```js
// client-side (but relevant to know for backend contract)
awareness.setLocalStateField('user', { name, color });
awareness.setLocalStateField('cursor', { anchor, head });
```

Awareness state flows over the same Yjs connection — no separate backend code needed beyond relaying it, which `y-socket.io`/`y-websocket` already does.

For **room-level presence** (who's currently in the room, shown in a sidebar — different from cursor position), use Redis:

```js
// redisPresenceService.js
async function userJoined(roomId, userId, meta) {
  await redis.hset(`presence:${roomId}`, userId, JSON.stringify(meta));
  const users = await redis.hgetall(`presence:${roomId}`);
  io.to(roomId).emit('presence:update', users);
}

async function userLeft(roomId, userId) {
  await redis.hdel(`presence:${roomId}`, userId);
  const users = await redis.hgetall(`presence:${roomId}`);
  io.to(roomId).emit('presence:update', users);
}
```

This also gives you crash-safety: if a Node instance dies, Redis is still the source of truth for who's online, and you can use Socket.io's `disconnect` event with a grace-period timeout before removing presence (avoids flicker on brief reconnects).

---

## 6. Multi-Server Scaling (why Redis matters)

If you run more than one Node instance (you should design for this even if you deploy one initially), Socket.io needs the **Redis adapter** so events broadcast across all server instances, not just the one a client happens to be connected to:

```js
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
```

Without this, User A on Server 1 and User B on Server 2 in the "same room" will never see each other's edits — this is the #1 bug people hit when they scale past one instance.

---

## 7. AI Autocomplete

Keep this as a plain REST endpoint, not a socket event — it's request/response, not streaming state.

```js
// aiController.js
async function getCompletion(req, res) {
  const { code, cursorPosition, language } = req.body;
  const prefix = code.slice(0, cursorPosition);
  const suffix = code.slice(cursorPosition);

  const completion = await aiService.complete({
    prefix, suffix, language,
    maxTokens: 60, // keep it short — ghost text, not essays
  });

  res.json({ completion });
}
```

Practical notes:
- **Debounce on the client** (e.g. 300ms after typing stops) — don't fire a request per keystroke.
- **Rate-limit per user** on this route specifically — it's your most expensive endpoint.
- Use fill-in-the-middle style prompting (prefix + suffix) rather than just "continue this code" for better inline suggestions.
- Cache nothing here — context changes every keystroke, caching won't help.

---

## 8. Data Models (minimal viable schema)

```js
// Room
{
  _id, roomId (nanoid), name, ownerId,
  language, createdAt, lastActiveAt,
  visibility: 'public' | 'private'
}

// DocumentSnapshot
{
  roomId, ydocState: Buffer, version, updatedAt
}

// ChatMessage
{
  roomId, userId, username, text, timestamp
}
```

You don't need per-keystroke edit history in your DB — Yjs's internal state already encodes the CRDT structure. Snapshot is enough; you're not building your own version-control system on top.

---

## 9. Suggested Build Order

1. **Express + basic room CRUD** (create room, get room by ID) — no realtime yet.
2. **Socket.io connection + room join/leave + presence** — prove multi-user connection works.
3. **Wire in Yjs (via y-socket.io)** for the actual editor sync — this is the core feature, get it working with 2 browser tabs before anything else.
4. **Awareness for cursors** — once doc sync works, cursors are a small addition.
5. **Persistence** — debounce snapshot saves, restore on room load.
6. **Chat** — straightforward Socket.io room broadcast, easiest piece.
7. **Redis adapter** — once single-instance works end-to-end, add this for scaling.
8. **AI autocomplete** — bolt on last, it's isolated from the realtime complexity.

Doing Yjs sync early (step 3) is deliberate — it's the riskiest, most unfamiliar part. Everything else is stuff you've likely built before in some form.

---

## 10. Package List (backend)

```json
{
  "express": "^4.x",
  "socket.io": "^4.x",
  "@socket.io/redis-adapter": "^8.x",
  "yjs": "^13.x",
  "y-socket.io": "^1.x",
  "y-protocols": "^1.x",
  "redis": "^4.x",
  "mongoose": "^8.x",
  "jsonwebtoken": "^9.x",
  "nanoid": "^5.x",
  "dotenv": "^16.x"
}
```
