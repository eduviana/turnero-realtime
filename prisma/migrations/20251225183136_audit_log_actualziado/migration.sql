/*
  Warnings:

  - Added the required column `entity` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `action` on the `AuditLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventType` on the `AuditLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuditEventType" AS ENUM ('FUNCTIONAL', 'SECURITY', 'SYSTEM');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'STATUS_CHANGE', 'SEARCH', 'ASSIGN', 'UNASSIGN', 'CALL', 'COMPLETE', 'CANCEL', 'FORBIDDEN_ACCESS', 'UNAUTHORIZED_ACCESS');

-- CreateEnum
CREATE TYPE "AuditEntity" AS ENUM ('USER', 'TICKET', 'AFFILIATE', 'SERVICE', 'ORGANIZATION', 'SYSTEM');

-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "actorRole" "Role",
ADD COLUMN     "entity" "AuditEntity" NOT NULL,
ADD COLUMN     "entityId" TEXT,
DROP COLUMN "action",
ADD COLUMN     "action" "AuditAction" NOT NULL,
DROP COLUMN "eventType",
ADD COLUMN     "eventType" "AuditEventType" NOT NULL;

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_eventType_idx" ON "AuditLog"("eventType");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_action_actorId_idx" ON "AuditLog"("action", "actorId");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_idx" ON "AuditLog"("actorId");
