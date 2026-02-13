import "dotenv/config";
import { db } from "@/lib/db/prisma";
import { Prisma } from "@/generated/prisma/client";

async function main() {
  console.log("Seeding pharmacy medication products...");

  await db.pharmacyMedicationProduct.createMany({
    data: [
      { name: "Paracetamol 500mg", price: new Prisma.Decimal("1200.00") },
      { name: "Ibuprofeno 600mg", price: new Prisma.Decimal("1800.00") },
      { name: "Amoxicilina 500mg", price: new Prisma.Decimal("3500.00") },
      { name: "Omeprazol 20mg", price: new Prisma.Decimal("2200.00") },
      { name: "Losartán 50mg", price: new Prisma.Decimal("4000.00") },
    ],
    skipDuplicates: true,
  });

  console.log("Pharmacy medication products seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});