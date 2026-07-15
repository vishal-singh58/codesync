const mongoose = require('mongoose');

const snapshotSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true, index: true },
    state: { type: Buffer, required: true }, // Y.encodeStateAsUpdate(doc)
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DocumentSnapshot', snapshotSchema);