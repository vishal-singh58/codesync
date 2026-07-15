const aiService = require('../services/aiService');

async function getCompletion(req, res, next) {
  try {
    const { code, cursorPosition, language } = req.body;

    if (typeof code !== 'string' || typeof cursorPosition !== 'number') {
      return res.status(400).json({ error: 'code and cursorPosition are required' });
    }

    const prefix = code.slice(0, cursorPosition);
    const suffix = code.slice(cursorPosition);

    const completion = await aiService.complete({ prefix, suffix, language: language || 'plaintext' });
    res.json({ completion });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCompletion };
