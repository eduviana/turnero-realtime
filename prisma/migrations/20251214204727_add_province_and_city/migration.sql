/*
  Warnings:

  - A unique constraint covering the columns `[affiliateNumber]` on the table `Affiliate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityId` to the `Affiliate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceId` to the `Affiliate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AffiliateStatusReason" AS ENUM ('NONE', 'DEBT', 'MISSING_DOCUMENTATION', 'VOLUNTARY_LEAVE', 'ADMIN_DECISION');

-- AlterTable
ALTER TABLE "Affiliate" ADD COLUMN     "activatedAt" TIMESTAMP(3),
ADD COLUMN     "affiliateNumber" TEXT,
ADD COLUMN     "cityId" INTEGER NOT NULL,
ADD COLUMN     "inactivatedAt" TIMESTAMP(3),
ADD COLUMN     "organization" TEXT,
ADD COLUMN     "provinceId" INTEGER NOT NULL,
ADD COLUMN     "statusReason" "AffiliateStatusReason" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "suspendedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "provinceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Province_name_key" ON "Province"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Province_code_key" ON "Province"("code");

-- CreateIndex
CREATE INDEX "City_provinceId_idx" ON "City"("provinceId");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_provinceId_key" ON "City"("name", "provinceId");

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_affiliateNumber_key" ON "Affiliate"("affiliateNumber");

-- CreateIndex
CREATE INDEX "Affiliate_status_idx" ON "Affiliate"("status");

-- CreateIndex
CREATE INDEX "Affiliate_organization_idx" ON "Affiliate"("organization");

-- CreateIndex
CREATE INDEX "Affiliate_provinceId_idx" ON "Affiliate"("provinceId");

-- CreateIndex
CREATE INDEX "Affiliate_cityId_idx" ON "Affiliate"("cityId");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliate" ADD CONSTRAINT "Affiliate_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliate" ADD CONSTRAINT "Affiliate_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
