/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serviceId,number]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Patient_dni_idx" ON "Patient"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_code_key" ON "Ticket"("code");

-- CreateIndex
CREATE INDEX "Ticket_status_idx" ON "Ticket"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_serviceId_number_key" ON "Ticket"("serviceId", "number");
