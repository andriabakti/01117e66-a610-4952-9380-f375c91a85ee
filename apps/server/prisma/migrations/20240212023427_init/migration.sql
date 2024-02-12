-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" UUID NOT NULL,
    "unique_code" VARCHAR(30) NOT NULL,
    "shortened_url" VARCHAR(100) NOT NULL,
    "original_url" TEXT NOT NULL,
    "visit_count" INTEGER NOT NULL DEFAULT 0,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "links_id_key" ON "links"("id");

-- CreateIndex
CREATE UNIQUE INDEX "links_unique_code_key" ON "links"("unique_code");

-- CreateIndex
CREATE UNIQUE INDEX "links_shortened_url_key" ON "links"("shortened_url");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
