<h1 align="center">Link Shortener App</h1>

This application is build with <b>[NestJS](https://nestjs.com/)</b> as the backend and <b>[NextJS](https://nextjs.org/)</b> as the frontend that based on <b>[TypeScript](https://www.typescriptlang.org/)</b>

## API Documentation

You can access API Documentation of this application by importing this <b>[Collection](./link_shortener.postman_collection)</b> to your <b>Postman</b>

## How to Run

### 1. Setup / Run Docker

This application must be run on <b>Docker</b>, please make sure you already install <b>Docker</b> on your device and already running.

If it's not installed yet, you can download it: <b>[Here](https://www.docker.com/get-started/)</b> and follow the installation steps: <b>[Here](https://docs.docker.com/desktop/?_gl=1*t76e54*_ga*MTUwMzIxODczOS4xNzA3NjMzMjEy*_ga_XJWPQMJYHQ*MTcwNzc0NDQwMi4xMi4xLjE3MDc3NDQ0MjMuMzkuMC4w)</b>. You can run the apllication by running the following steps:

### 2. Clone the repository to your device

```sh
git clone https://github.com/andriabakti/01117e66-a610-4952-9380-f375c91a85ee
```

### 3. Set environment for App Server

Create <b>.env</b> file on <b>[Server Directory's Root](./apps/client)</b> then set <b>all the variables</b> below, or you can just copy paste from <b>[Example ENV for App Server](./apps/server/.env.example)</b>

```sh
# base env
BASE_PORT="3939"
BASE_URL="http://localhost:${BASE_PORT}"

# jwt env
JWT_KEY="ESIRNUS"
JWT_TTL="1d"

# throller env
THROTTLER_TTL="1"
THROTTLER_LIMIT="100"

# database env
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="andria_link_shortener"
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?schema=public"

# redis env
REDIS_URL="redis://redis:6379"
```

### 4. Set environment for App Client

Create <b>.env</b> file on <b>[Client Directory's Root](./apps/client)</b> then set the variable below inside it, or copy paste from <b>[Example ENV for App Client](./apps/client/.env.example)</b>

```sh
NEXT_PUBLIC_SERVER_API="http://localhost:3939"
```

### 5. Run `docker compose`

Run <b>[docker compose](./docker-compose.yml)</b> by the following command on the root directory of the project

```sh
docker compose up -d
```
