FROM node:20

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps ./apps
COPY prisma ./prisma

RUN pnpm install

EXPOSE 5173

CMD ["pnpm", "--filter", "frontend", "run", "dev"]