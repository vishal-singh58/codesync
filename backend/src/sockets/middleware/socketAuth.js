const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/env');

function socketAuth(socket, next) {
  const token = socket.handshake.auth?.token;

  // allow guest access with a generated identity if no token provided
  if (!token) {
    socket.user = {
      id: `guest-${socket.id}`,
      username: `Guest-${socket.id.slice(0, 4)}`,
    };
    return next();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    socket.user = { id: payload.sub, username: payload.username };
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
}

module.exports = socketAuth;
