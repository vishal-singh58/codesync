const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true, index: true },
    name: { type: String, default: 'Untitled Room' },
    ownerId: { type: String, required: true },
    language: { type: String, default: 'javascript' },
    visibility: { type: String, enum: ['public', 'private'], default: 'private' },
    lastActiveAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);