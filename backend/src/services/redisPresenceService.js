const { pubClient } = require('../config/redis');

const key = (roomId) => `presence:${roomId}`;

async function userJoined(roomId, userId, meta) {
  await pubClient.hSet(key(roomId), userId, JSON.stringify(meta));
  return getPresence(roomId);
}

async function userLeft(roomId, userId) {
  await pubClient.hDel(key(roomId), userId);
  return getPresence(roomId);
}

async function getPresence(roomId) {
  const raw = await pubClient.hGetAll(key(roomId));
  return Object.fromEntries(Object.entries(raw).map(([id, val]) => [id, JSON.parse(val)]));
}

module.exports = { userJoined, userLeft, getPresence };