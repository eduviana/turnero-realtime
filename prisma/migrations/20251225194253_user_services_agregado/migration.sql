-- CreateTable
CREATE TABLE "UserService" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unassignedAt" TIMESTAMP(3),

    CONSTRAINT "UserService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserService_userId_idx" ON "UserService"("userId");

-- CreateIndex
CREATE INDEX "UserService_serviceId_idx" ON "UserService"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "UserService_userId_serviceId_key" ON "UserService"("userId", "serviceId");

-- AddForeignKey
ALTER TABLE "UserService" ADD CONSTRAINT "UserService_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserService" ADD CONSTRAINT "UserService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
