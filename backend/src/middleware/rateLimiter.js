// Minimal fixed-window rate limiter, no extra dependency needed.
// For multi-instance deployments, back this with Redis INCR + EXPIRE instead.
const hits = new Map(); // key -> { count, resetAt }

function rateLimiter({ windowMs = 10_000, max = 5 } = {}) {
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const entry = hits.get(key);

    if (!entry || now > entry.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (entry.count >= max) {
      return res.status(429).json({ error: 'Too many requests, slow down.' });
    }

    entry.count += 1;
    next();
  };
}

module.exports = rateLimiter;