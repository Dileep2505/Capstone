import { prisma } from '../config/prisma';

export const VillagesRepository = {
  findByName: async (q: string) => {
    return prisma.village.findMany({
      where: { name: { contains: q, mode: 'insensitive' } },
      take: 25,
      select: { id: true, name: true, districtId: true, subDistrictId: true },
    });
  },
  findById: async (id: number) => {
    return prisma.village.findUnique({ where: { id } });
  },
};
