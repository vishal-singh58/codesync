const ChatMessage = require('../models/ChatMessage');

async function getHistory(req, res, next) {
  try {
    const { roomId } = req.params;
    const messages = await ChatMessage.find({ roomId })
      .sort({ createdAt: 1 })
      .limit(200);
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

module.exports = { getHistory };