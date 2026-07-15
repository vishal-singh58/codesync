const ChatMessage = require('../../models/ChatMessage');

function registerChatHandlers(io, socket) {
  socket.on('chat:message', async ({ roomId, text }) => {
    if (!text?.trim()) return;

    const message = await ChatMessage.create({
      roomId,
      userId: socket.user.id,
      username: socket.user.username,
      text: text.slice(0, 2000), // basic guard against huge payloads
    });

    io.to(roomId).emit('chat:message', {
      id: message._id,
      userId: message.userId,
      username: message.username,
      text: message.text,
      createdAt: message.createdAt,
    });
  });
}

module.exports = registerChatHandlers;