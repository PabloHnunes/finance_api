-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "email" TEXT NOT NULL,
    "document" VARCHAR(11) NOT NULL,
    "password" VARCHAR(80) NOT NULL,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL,
    "date_expiration" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_document_key" ON "Users"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_name_key" ON "Profiles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_token_key" ON "Sessions"("token");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
