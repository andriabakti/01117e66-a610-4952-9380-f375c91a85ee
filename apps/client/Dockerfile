FROM node:lts-alpine AS builder

WORKDIR /app/frontend

RUN npm install -g pnpm --silent

COPY . .

RUN pnpm install --silent

RUN pnpm add -D @types/react-copy-to-clipboard

RUN pnpm run build

CMD ["pnpm", "run", "start"]