const express = require('express');
const { getCompletion } = require('../controllers/aiController');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

// tighter limit here — this is the expensive endpoint
router.post('/autocomplete', rateLimiter({ windowMs: 10_000, max: 8 }), getCompletion);

module.exports = router;
