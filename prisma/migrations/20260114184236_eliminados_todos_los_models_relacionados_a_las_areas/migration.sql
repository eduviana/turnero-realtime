/*
  Warnings:

  - You are about to drop the `Medicine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PharmacyMedicineRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PharmacyMedicineRequestItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PharmacyMedicineRequestItem" DROP CONSTRAINT "PharmacyMedicineRequestItem_medicineId_fkey";

-- DropForeignKey
ALTER TABLE "PharmacyMedicineRequestItem" DROP CONSTRAINT "PharmacyMedicineRequestItem_requestId_fkey";

-- DropTable
DROP TABLE "Medicine";

-- DropTable
DROP TABLE "PharmacyMedicineRequest";

-- DropTable
DROP TABLE "PharmacyMedicineRequestItem";

-- DropEnum
DROP TYPE "PharmacyMedicineRequestStatus";
