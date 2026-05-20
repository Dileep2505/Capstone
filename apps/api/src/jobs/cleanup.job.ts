// Placeholder job script
import { prisma } from '../config/prisma';

/**
 * Periodic cleanup job.
 * Example: remove very old api logs or temporary records.
 */
export async function runCleanupJob() {
  try {
    console.log('Running cleanup job: pruning API logs older than 90 days');
    const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const deleted = await prisma.apiLog.deleteMany({ where: { createdAt: { lt: cutoff } } });
    console.log(`Cleanup complete. Deleted ${deleted.count} apiLog records.`);
  } catch (err) {
    console.error('Cleanup job error', err);
  }
}
