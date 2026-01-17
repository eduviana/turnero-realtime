-- CreateEnum
CREATE TYPE "PharmacyMedicineRequestStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Medicine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "presentation" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyMedicineRequest" (
    "id" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "operatorId" TEXT,
    "serviceCode" TEXT NOT NULL,
    "status" "PharmacyMedicineRequestStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "PharmacyMedicineRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyMedicineRequestItem" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PharmacyMedicineRequestItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Medicine_name_idx" ON "Medicine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyMedicineRequestItem_requestId_medicineId_key" ON "PharmacyMedicineRequestItem"("requestId", "medicineId");

-- AddForeignKey
ALTER TABLE "PharmacyMedicineRequestItem" ADD CONSTRAINT "PharmacyMedicineRequestItem_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "PharmacyMedicineRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyMedicineRequestItem" ADD CONSTRAINT "PharmacyMedicineRequestItem_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
