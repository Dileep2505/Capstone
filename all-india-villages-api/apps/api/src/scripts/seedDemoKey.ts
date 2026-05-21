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

  // Try a few times in case the DB is transiently unavailable (Neon connection pool hiccups).
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
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

    } catch (err: any) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`ensureDemoApiKey attempt ${attempt} failed:`, msg);
      if (attempt < maxAttempts) {
        // exponential backoff
        const wait = 500 * Math.pow(2, attempt - 1);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      const finalMsg = err instanceof Error ? err.message : String(err);
      console.error('Failed to create demo API key after retries:', finalMsg);
      return { key: demoKey, secret: demoSecret };
    }
  }
}
