-- CreateIndex
CREATE INDEX "Ticket_serviceId_status_createdAt_idx" ON "Ticket"("serviceId", "status", "createdAt");
