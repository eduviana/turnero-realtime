import "dotenv/config";
import { db } from "@/lib/db/prisma";

async function main() {
  console.log("Seeding pharmacy general products...");

  await db.pharmacyGeneralProduct.createMany({
    data: [
      { name: "Alcohol 70%" },
      { name: "Algodón" },
      { name: "Gasas estériles" },
      { name: "Barbijo descartable" },
      { name: "Guantes de látex" },
    ],
    skipDuplicates: true,
  });

  console.log("Pharmacy general products seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});