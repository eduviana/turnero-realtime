/*
  Warnings:

  - Added the required column `unitPrice` to the `PharmacyMedicationOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `PharmacyMedicationProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PharmacyMedicationOrderItem" ADD COLUMN     "unitPrice" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "PharmacyMedicationProduct" ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;
