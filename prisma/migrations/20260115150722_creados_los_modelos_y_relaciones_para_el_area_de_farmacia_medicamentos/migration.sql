/*
  Warnings:

  - You are about to drop the `PharmacyMedicationDispense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PharmacyMedicationDispenseItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PharmacyMedicationDispense" DROP CONSTRAINT "PharmacyMedicationDispense_createdById_fkey";

-- DropForeignKey
ALTER TABLE "PharmacyMedicationDispenseItem" DROP CONSTRAINT "PharmacyMedicationDispenseItem_dispenseId_fkey";

-- DropForeignKey
ALTER TABLE "PharmacyMedicationDispenseItem" DROP CONSTRAINT "PharmacyMedicationDispenseItem_productId_fkey";

-- DropTable
DROP TABLE "PharmacyMedicationDispense";

-- DropTable
DROP TABLE "PharmacyMedicationDispenseItem";

-- CreateTable
CREATE TABLE "PharmacyMedicationOrder" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "affiliateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PharmacyMedicationOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyMedicationOrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PharmacyMedicationOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyMedicationOrder_ticketId_key" ON "PharmacyMedicationOrder"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyMedicationOrderItem_orderId_productId_key" ON "PharmacyMedicationOrderItem"("orderId", "productId");

-- AddForeignKey
ALTER TABLE "PharmacyMedicationOrder" ADD CONSTRAINT "PharmacyMedicationOrder_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyMedicationOrder" ADD CONSTRAINT "PharmacyMedicationOrder_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyMedicationOrder" ADD CONSTRAINT "PharmacyMedicationOrder_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyMedicationOrder" ADD CONSTRAINT "PharmacyMedicationOrder_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyMedicationOrderItem" ADD CONSTRAINT "PharmacyMedicationOrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PharmacyMedicationOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyMedicationOrderItem" ADD CONSTRAINT "PharmacyMedicationOrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "PharmacyMedicationProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
