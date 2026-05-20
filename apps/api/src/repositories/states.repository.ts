import { prisma } from '../config/prisma';

export const StatesRepository = {
  findAll: async () => {
    return prisma.state.findMany({ orderBy: { name: 'asc' } });
  },
  findById: async (id: number) => {
    return prisma.state.findUnique({ where: { id } });
  },
};
