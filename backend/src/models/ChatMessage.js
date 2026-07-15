const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatMessage', chatSchema);
