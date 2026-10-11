FROM node:20-alpine AS builder
WORKDIR /app
# Enable Corepack to Use pnpm Without Global Install
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY package.json pnpm-lock.yaml ./
# Install Dependencies Exactly as Locked
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY package.json pnpm-lock.yaml ./
# Install Only Production Dependencies
RUN pnpm install --prod --frozen-lockfile
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]