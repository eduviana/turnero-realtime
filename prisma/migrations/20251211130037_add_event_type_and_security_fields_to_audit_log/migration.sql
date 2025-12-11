/*
  Warnings:

  - Added the required column `eventType` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "ip" TEXT,
ADD COLUMN     "userAgent" TEXT;
