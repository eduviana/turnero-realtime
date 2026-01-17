/*
  Warnings:

  - Added the required column `ticketId` to the `PharmacyMedicineRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PharmacyMedicineRequest" ADD COLUMN     "ticketId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "PharmacyMedicineRequest_ticketId_idx" ON "PharmacyMedicineRequest"("ticketId");

-- CreateIndex
CREATE INDEX "PharmacyMedicineRequest_affiliateId_idx" ON "PharmacyMedicineRequest"("affiliateId");
