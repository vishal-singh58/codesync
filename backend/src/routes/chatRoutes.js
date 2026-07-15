const express = require('express');
const { getHistory } = require('../controllers/chatController');

const router = express.Router();

router.get('/:roomId', getHistory);

module.exports = router;