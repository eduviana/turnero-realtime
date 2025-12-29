/*
  Warnings:

  - You are about to drop the column `isOnline` on the `UserStatus` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserStatus_isOnline_idx";

-- AlterTable
ALTER TABLE "UserStatus" DROP COLUMN "isOnline";
