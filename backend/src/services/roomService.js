const { nanoid } = require('nanoid');
const Room = require('../models/Room');

async function createRoom({ ownerId, name, language }) {
  const roomId = nanoid(10);
  return Room.create({ roomId, ownerId, name, language });
}

async function getRoom(roomId) {
  return Room.findOne({ roomId });
}

async function touchRoom(roomId) {
  return Room.findOneAndUpdate({ roomId }, { lastActiveAt: new Date() });
}

module.exports = { createRoom, getRoom, touchRoom };