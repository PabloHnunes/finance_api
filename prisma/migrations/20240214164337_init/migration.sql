-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
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
    "user_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL,
    "date_expiration" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Rent" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(60) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "type_rent_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypesRent" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(60) NOT NULL,

    CONSTRAINT "TypesRent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spending" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(60) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date_start" DATE NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 1,
    "spending_type_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spending_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpendingType" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(60) NOT NULL,

    CONSTRAINT "SpendingType_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "Rent_user_id_type_rent_id_month_year_key" ON "Rent"("user_id", "type_rent_id", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "TypesRent_description_key" ON "TypesRent"("description");

-- CreateIndex
CREATE UNIQUE INDEX "SpendingType_description_key" ON "SpendingType"("description");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_type_rent_id_fkey" FOREIGN KEY ("type_rent_id") REFERENCES "TypesRent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spending" ADD CONSTRAINT "Spending_spending_type_id_fkey" FOREIGN KEY ("spending_type_id") REFERENCES "SpendingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
