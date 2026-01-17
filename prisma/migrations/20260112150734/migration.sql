/*
  Warnings:

  - A unique constraint covering the columns `[name,presentation]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Medicine_name_presentation_key" ON "Medicine"("name", "presentation");
