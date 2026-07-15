require('dotenv').config();

function required(name, fallback) {
  const val = process.env[name] ?? fallback;
  if (val === undefined) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return val;
}

module.exports = {
  PORT: Number(process.env.PORT || 4000),
  MONGO_URI: required('MONGO_URI', 'mongodb://localhost:27017/collab-editor'),
  REDIS_URL: required('REDIS_URL', 'redis://localhost:6379'),
  JWT_SECRET: required('JWT_SECRET', 'dev-secret-change-me'),
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  AI_API_KEY: process.env.AI_API_KEY || '',
  SNAPSHOT_INTERVAL_MS: Number(process.env.SNAPSHOT_INTERVAL_MS || 4000),
};