const { createClient } = require('redis');
const { REDIS_URL } = require('./env');

const pubClient = createClient({ url: REDIS_URL });
const subClient = pubClient.duplicate();

pubClient.on('error', (err) => console.error('[redis:pub] error', err));
subClient.on('error', (err) => console.error('[redis:sub] error', err));

async function connectRedis() {
  await pubClient.connect();
  await subClient.connect();
  console.log('[redis] connected');
}

module.exports = { pubClient, subClient, connectRedis };