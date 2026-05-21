import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';

/**
 * Create a demo API key for local/dev if none exists.
 * Runs only when NODE_ENV !== 'production'.
 */
export async function ensureDemoApiKey() {
  if (process.env.NODE_ENV === 'production') return;

  const demoKey = process.env.DEMO_API_KEY || 'demo-key';
  const demoSecret = process.env.DEMO_API_SECRET || 'demo-secret';

  const existing = await prisma.apiKey.findUnique({ where: { key: demoKey } });
  if (existing) {
    console.log('Demo API key already exists.');
    return { key: demoKey, secret: demoSecret };
  }

  const hashed = await bcrypt.hash(demoSecret, 10);

  const userPasswordHash = await bcrypt.hash('demo-password', 10);

  const created = await prisma.apiKey.create({
    data: {
      key: demoKey,
      secretHash: hashed,
      name: 'Demo key (auto-created)',
      isActive: true,
      user: {
        create: { email: 'demo@example.com', password: userPasswordHash }
      }
    },
    include: { user: true }
  });

  console.log('Created demo API key:', demoKey);
  console.log('Demo API secret (store this securely):', demoSecret);
  return { key: demoKey, secret: demoSecret };
}
