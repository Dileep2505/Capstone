import fs from 'fs';
import path from 'path';
import { prisma } from '../config/prisma';

/**
 * Job to import villages from CSV/JSON dataset.
 * This is a conservative placeholder; adapt to your dataset format.
 */
export async function runImportVillagesJob() {
  const datasetPath = path.resolve(__dirname, '../../../scripts/data-import/dataset/villages.json');
  if (!fs.existsSync(datasetPath)) {
    console.warn('Dataset not found at', datasetPath);
    return;
  }

  const raw = fs.readFileSync(datasetPath, 'utf8');
  const items = JSON.parse(raw) as Array<{ name: string; districtId?: number }>;
  console.log(`Importing ${items.length} villages (dry-run: false)`);

  for (const it of items.slice(0, 1000)) {
    try {
      await prisma.village.upsert({
        where: { name: it.name },
        update: {},
        create: { name: it.name, districtId: it.districtId ?? undefined },
      });
    } catch (err) {
      console.error('Failed to import', it.name, err);
    }
  }
}
