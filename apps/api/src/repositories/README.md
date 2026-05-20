# Repositories

Repository layer wrappers around the Prisma client. These encapsulate common DB access patterns so controllers/services stay small.

Examples:
- `villages.repository.ts` — find villages by name or id
- `states.repository.ts` — list and lookup states

When adding new repository files, prefer using the shared `prisma` instance from `src/config/prisma`.
