/*
  Warnings:

  - Added the required column `unitPrice` to the `PharmacyGeneralOrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PharmacyGeneralOrderItem" ADD COLUMN     "unitPrice" DECIMAL(10,2) NOT NULL;
