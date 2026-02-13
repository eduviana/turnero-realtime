import "dotenv/config";
import { db } from "@/lib/db/prisma";
import { Prisma } from "@/generated/prisma/client";

async function main() {
  console.log("Seeding pharmacy general products...");

  await db.pharmacyGeneralProduct.createMany({
    data: [
      { name: "Alcohol 70%", price: new Prisma.Decimal("1000.00") },
      { name: "Algodón", price: new Prisma.Decimal("500.00") },
      { name: "Gasas estériles", price: new Prisma.Decimal("800.00") },
      { name: "Barbijo descartable", price: new Prisma.Decimal("300.00") },
      { name: "Guantes de látex", price: new Prisma.Decimal("1200.00") },
    ],
    skipDuplicates: true,
  });

  console.log("Pharmacy general products seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});