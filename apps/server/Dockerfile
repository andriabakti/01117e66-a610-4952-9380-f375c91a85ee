FROM node:lts-alpine AS builder

WORKDIR /app/backend

RUN npm install -g pnpm --silent

COPY . .

RUN pnpm install --silent

RUN pnpm run build

CMD /app/backend/run.sh