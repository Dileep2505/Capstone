FROM node:20

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps ./apps
COPY prisma ./prisma

RUN pnpm install

RUN pnpm exec prisma generate --schema prisma/schema.prisma

EXPOSE 3000

CMD ["pnpm", "--filter", "@all-india-villages/api", "run", "dev"]