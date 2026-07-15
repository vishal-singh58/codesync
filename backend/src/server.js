const http = require('http');
const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');

const app = require('./app');
const { PORT, CORS_ORIGIN } = require('./config/env');
const { connectDB } = require('./config/db');
const { pubClient, subClient, connectRedis } = require('./config/redis');
const initSockets = require('./sockets');

async function main() {
  await connectDB();
  await connectRedis();

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: CORS_ORIGIN },
    maxHttpBufferSize: 5e6, // allow reasonably large yjs sync payloads
  });

  // lets Socket.io broadcast across multiple Node instances via Redis
  io.adapter(createAdapter(pubClient, subClient));

  initSockets(io);

  httpServer.listen(PORT, () => {
    console.log(`[server] listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('[server] failed to start', err);
  process.exit(1);
});
