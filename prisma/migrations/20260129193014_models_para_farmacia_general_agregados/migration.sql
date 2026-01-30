-- CreateTable
CREATE TABLE "PharmacyGeneralProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PharmacyGeneralProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyGeneralOrder" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "affiliateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PharmacyGeneralOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyGeneralOrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PharmacyGeneralOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyGeneralOrder_ticketId_key" ON "PharmacyGeneralOrder"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyGeneralOrderItem_orderId_productId_key" ON "PharmacyGeneralOrderItem"("orderId", "productId");

-- AddForeignKey
ALTER TABLE "PharmacyGeneralOrder" ADD CONSTRAINT "PharmacyGeneralOrder_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyGeneralOrder" ADD CONSTRAINT "PharmacyGeneralOrder_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyGeneralOrder" ADD CONSTRAINT "PharmacyGeneralOrder_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyGeneralOrder" ADD CONSTRAINT "PharmacyGeneralOrder_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyGeneralOrderItem" ADD CONSTRAINT "PharmacyGeneralOrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PharmacyGeneralOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyGeneralOrderItem" ADD CONSTRAINT "PharmacyGeneralOrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "PharmacyGeneralProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
