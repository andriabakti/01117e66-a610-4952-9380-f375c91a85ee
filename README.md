<h1 align="center">Link Shortener App</h1>

This application is build with <b>[NestJS](https://nestjs.com/)</b> as the backend and <b>[Next.js](https://nextjs.org/)</b> as the frontend that based on <b>[TypeScript](https://www.typescriptlang.org/)</b>

## API Documentation

You can access API Documentation of this application by importing this <b>[Collection](./link_shortener.postman_collection)</b> to your <b>Postman</b>

## How to Run

### 1. Setup / Run Docker

This application must be run on <b>Docker</b>, please make sure <b>Docker</b> already installed on your device and it's already running.

If it's not installed yet, you can download it based on your device OS: <b>[Here](https://www.docker.com/get-started/)</b>, then follow the installation steps: <b>[Here](https://docs.docker.com/engine/install/)</b> or <b>[Here](https://docs.docker.com/desktop/?_gl=1*1kyz2v1*_ga*MTUwMzIxODczOS4xNzA3NjMzMjEy*_ga_XJWPQMJYHQ*MTcwNzkxOTQ5Mi4xNS4xLjE3MDc5MjA0MDAuNTguMC4w)</b>. After the installation, please make sure <b>Docker Engine / Docker Desktop</b> already running.

### 2. Clone the Repo

Open terminal on your device, clone this repository to your device using <b>[Git](https://git-scm.com/downloads)</b>, after that enter the project directory using the following command:

```sh
git clone https://github.com/andriabakti/01117e66-a610-4952-9380-f375c91a85ee
cd ./01117e66-a610-4952-9380-f375c91a85ee
```

### 3. Setup Environment for App Server

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

### 4. Setup Environment for App Client

Create <b>.env</b> file on <b>[Client Directory's Root](./apps/client)</b> then set the variable below inside it, or copy paste from <b>[Example ENV for App Client](./apps/client/.env.example)</b>

```sh
NEXT_PUBLIC_SERVER_API="http://localhost:3939"
```

### 5. Run `docker compose`

Run <b>[docker compose](./docker-compose.yml)</b> by the following command on the root directory of the project

```sh
docker compose up -d
```

### 6. Open the App

After <b>docker compose</b> finished, open <b>http://localhost:3000/</b> on your browser
