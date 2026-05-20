# Generated

This directory historically held generated artifacts such as the Prisma client and other codegen outputs.

Do not commit generated client into source control. Regenerate using:

```bash
pnpm --filter apps/api exec prisma generate --schema ../../prisma/schema.prisma
```

If you want to keep a local generated copy for offline dev, ensure it's added to `.gitignore`.
