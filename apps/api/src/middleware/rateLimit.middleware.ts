import type { Request, Response, NextFunction } from 'express';

// Simple in-memory rate limiter for development only
const windowMs = 60 * 1000; // 1 minute
const maxHits = 120;
const store = new Map<string, { count: number; expires: number }>();

export function devRateLimiter(req: Request, res: Response, next: NextFunction) {
  const key = req.ip || (req.header('x-api-key') ?? req.ip) as string;
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || entry.expires < now) {
    store.set(key, { count: 1, expires: now + windowMs });
    return next();
  }

  if (entry.count >= maxHits) {
    res.status(429).json({ success: false, message: 'Rate limit exceeded' });
    return;
  }
  entry.count += 1;
  store.set(key, entry);
  next();
}
