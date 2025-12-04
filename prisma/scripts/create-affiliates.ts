import "dotenv/config";
import { db } from "@/lib/db/prisma";



async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  console.log("Seeding affiliates...");

  await db.affiliate.createMany({
    data: [
      // 8 ACTIVE
      {
        dni: "10000001",
        firstName: "Juan",
        lastName: "Pérez",
        phone: "4936591",
        email: "juan.perez@example.com",
        status: "ACTIVE",
      },
      {
        dni: "10000002",
        firstName: "María",
        lastName: "Gómez",
        phone: "4936592",
        email: "maria.gomez@example.com",
        status: "ACTIVE",
      },
      {
        dni: "10000003",
        firstName: "Carlos",
        lastName: "López",
        phone: "4936593",
        email: "carlos.lopez@example.com",
        status: "ACTIVE",
      },
      {
        dni: "10000004",
        firstName: "Ana",
        lastName: "Rodríguez",
        phone: "4936594",
        email: "ana.rodriguez@example.com",
        status: "ACTIVE",
      },
      {
        dni: "10000005",
        firstName: "Pedro",
        lastName: "Martínez",
        phone: "4936595",
        email: "pedro.martinez@example.com",
        status: "ACTIVE",
      },
      {
        dni: "10000006",
        firstName: "Lucía",
        lastName: "Fernández",
        phone: "4936596",
        email: "lucia.fernandez@example.com",
        status: "ACTIVE",
      },
      {
        dni: "10000007",
        firstName: "Jorge",
        lastName: "Suárez",
        phone: "4936597",
        email: "jorge.suarez@example.com",
        status: "ACTIVE",
      },
      {
        dni: "10000008",
        firstName: "Sofía",
        lastName: "Molina",
        phone: "4936598",
        email: "sofia.molina@example.com",
        status: "ACTIVE",
      },

      // 1 SUSPENDED
      {
        dni: "10000009",
        firstName: "Diego",
        lastName: "Ramírez",
        phone: "4936599",
        email: "diego.ramirez@example.com",
        status: "SUSPENDED",
      },

      // 1 INACTIVE
      {
        dni: "10000010",
        firstName: "Elena",
        lastName: "Castro",
        phone: "4936600",
        email: "elena.castro@example.com",
        status: "INACTIVE",
      },
    ],
  });

  console.log("Seed completed.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });