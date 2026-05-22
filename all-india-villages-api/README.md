# all-india-villages-api

Monorepo scaffold for the India villages platform.

## Structure

- `apps/api` - Express backend
- `apps/frontend` - Admin client dashboard
- `apps/b2b-portal` - B2B client portal for companies using the API
- `apps/demo-client` - Public/demo client for marketing and sample access
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