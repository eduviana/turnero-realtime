-- CreateTable
CREATE TABLE "PharmacyMedicationProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PharmacyMedicationProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyMedicationDispense" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "PharmacyMedicationDispense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyMedicationDispenseItem" (
    "id" TEXT NOT NULL,
    "dispenseId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PharmacyMedicationDispenseItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyMedicationDispenseItem_dispenseId_productId_key" ON "PharmacyMedicationDispenseItem"("dispenseId", "productId");

-- AddForeignKey
ALTER TABLE "PharmacyMedicationDispense" ADD CONSTRAINT "PharmacyMedicationDispense_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyMedicationDispenseItem" ADD CONSTRAINT "PharmacyMedicationDispenseItem_dispenseId_fkey" FOREIGN KEY ("dispenseId") REFERENCES "PharmacyMedicationDispense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyMedicationDispenseItem" ADD CONSTRAINT "PharmacyMedicationDispenseItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "PharmacyMedicationProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
