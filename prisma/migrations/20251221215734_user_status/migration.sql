/*
  Warnings:

  - You are about to drop the column `lastHeartbeat` on the `UserStatus` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserStatus_lastHeartbeat_idx";

-- AlterTable
ALTER TABLE "UserStatus" DROP COLUMN "lastHeartbeat";
