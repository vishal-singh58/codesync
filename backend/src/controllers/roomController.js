const roomService = require('../services/roomService');

async function createRoom(req, res, next) {
  try {
    const { name, language, ownerId } = req.body;
    const room = await roomService.createRoom({
      ownerId: ownerId || 'anonymous',
      name,
      language,
    });
    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
}

async function getRoom(req, res, next) {
  try {
    const room = await roomService.getRoom(req.params.roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    next(err);
  }
}

module.exports = { createRoom, getRoom };