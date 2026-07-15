const DocumentSnapshot = require('../models/DocumentSnapshot');

async function load(roomId) {
  const doc = await DocumentSnapshot.findOne({ roomId });
  return doc ? new Uint8Array(doc.state) : null;
}

async function save(roomId, buffer) {
  await DocumentSnapshot.findOneAndUpdate(
    { roomId },
    { state: buffer, $inc: { version: 1 } },
    { upsert: true }
  );
}

module.exports = { load, save };