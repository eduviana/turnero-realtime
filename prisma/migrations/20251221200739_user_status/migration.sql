/*
  Warnings:

  - Added the required column `updatedAt` to the `UserStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserStatus" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastActivityAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "UserStatus_lastHeartbeat_idx" ON "UserStatus"("lastHeartbeat");

-- CreateIndex
CREATE INDEX "UserStatus_lastActivityAt_idx" ON "UserStatus"("lastActivityAt");
