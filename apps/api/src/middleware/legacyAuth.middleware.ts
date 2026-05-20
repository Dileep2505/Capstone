import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';

/**
 * Legacy API key middleware that validates `x-api-key` and `x-api-secret` headers.
 * This mirrors the previous auth behavior used by the demo frontends.
 */
export async function legacyAuth(req: Request, res: Response, next: NextFunction) {
  const key = (req.header('x-api-key') || '').toString();
  const secret = (req.header('x-api-secret') || '').toString();

  if (!key || !secret) {
    return res.status(401).json({ success: false, message: 'API key and secret required' });
  }

  try {
    const apiKey = await prisma.apiKey.findUnique({ where: { key } });
    if (!apiKey) return res.status(401).json({ success: false, message: 'Invalid API key' });

    // For demo: compare plain secret (in production use hashed secrets)
    if (apiKey.secret !== secret) return res.status(401).json({ success: false, message: 'Invalid API secret' });

    // attach metadata
    (req as any).apiKey = { id: apiKey.id, key: apiKey.key };
    next();
  } catch (err) {
    next(err);
  }
}
