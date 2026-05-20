# all-india-villages-api

Monorepo scaffold for the India villages platform.

## Structure

- `apps/api` - Express backend
- `apps/admin-dashboard` - React admin panel
- `apps/b2b-portal` - Client dashboard
- `apps/demo-client` - Public demo app
- `packages/shared-types` - Shared TypeScript types
- `packages/eslint-config` - Shared lint rules
- `packages/ui-components` - Shared UI components
- `prisma` - Database schema and migrations
- `scripts` - Import, validation, and seed utilities
- `docs` - API, architecture, and deployment notes

## Root commands

- `pnpm build`
- `pnpm dev`
- `pnpm lint`
- `pnpm check`
- `pnpm test`