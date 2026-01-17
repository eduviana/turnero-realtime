import "dotenv/config";
import { db } from "@/lib/db/prisma";

async function main() {
  console.log("Seeding pharmacy medication products...");

  await db.pharmacyMedicationProduct.createMany({
    data: [
      { name: "Paracetamol 500mg" },
      { name: "Ibuprofeno 600mg" },
      { name: "Amoxicilina 500mg" },
      { name: "Omeprazol 20mg" },
      { name: "Losartán 50mg" },
    ],
    skipDuplicates: true,
  });

  console.log("Pharmacy medication products seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});