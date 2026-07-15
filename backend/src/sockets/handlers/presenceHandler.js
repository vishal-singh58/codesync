const presenceService = require('../../services/redisPresenceService');

function registerPresenceHandlers(io, socket) {
  socket.on('room:join', async ({ roomId }) => {
    socket.join(roomId);
    socket.data.roomId = roomId;

    const meta = { username: socket.user.username, color: randomColor(socket.user.id) };
    const presence = await presenceService.userJoined(roomId, socket.user.id, meta);

    io.to(roomId).emit('presence:update', presence);
    socket.to(roomId).emit('user:joined', { userId: socket.user.id, ...meta });
  });

  socket.on('disconnect', async () => {
    const { roomId } = socket.data;
    if (!roomId) return;

    const presence = await presenceService.userLeft(roomId, socket.user.id);
    io.to(roomId).emit('presence:update', presence);
    io.to(roomId).emit('user:left', { userId: socket.user.id });
  });
}

// deterministic-ish color per user so it stays consistent across sessions
function randomColor(seed) {
  const colors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6'];
  let hash = 0;
  for (const char of seed) hash = (hash + char.charCodeAt(0)) % colors.length;
  return colors[hash];
}

module.exports = registerPresenceHandlers;
