import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';

export async function apiLogger(req: Request, _res: Response, next: NextFunction) {
  try {
    const key = req.header('x-api-key') || undefined;
    // fire-and-forget logging to DB
    prisma.apiLog.create({
      data: {
        apiKey: key ? String(key) : null,
        path: req.path,
        method: req.method,
        ip: req.ip,
        userAgent: req.header('user-agent') ?? undefined,
      },
    }).catch((err) => console.warn('apiLog create failed', err));
  } catch (err) {
    console.warn('apiLogger middleware error', err);
  }
  next();
}
