// import "dotenv/config";
// import { db } from "@/lib/db/prisma";



// async function main() {
//   console.log("DATABASE_URL:", process.env.DATABASE_URL);

//   console.log("Seeding affiliates...");

//   await db.affiliate.createMany({
//     data: [
//       // 8 ACTIVE
//       {
//         dni: "10000001",
//         firstName: "Juan",
//         lastName: "Pérez",
//         phone: "4936591",
//         email: "juan.perez@example.com",
//         status: "ACTIVE",
//       },
//       {
//         dni: "10000002",
//         firstName: "María",
//         lastName: "Gómez",
//         phone: "4936592",
//         email: "maria.gomez@example.com",
//         status: "ACTIVE",
//       },
//       {
//         dni: "10000003",
//         firstName: "Carlos",
//         lastName: "López",
//         phone: "4936593",
//         email: "carlos.lopez@example.com",
//         status: "ACTIVE",
//       },
//       {
//         dni: "10000004",
//         firstName: "Ana",
//         lastName: "Rodríguez",
//         phone: "4936594",
//         email: "ana.rodriguez@example.com",
//         status: "ACTIVE",
//       },
//       {
//         dni: "10000005",
//         firstName: "Pedro",
//         lastName: "Martínez",
//         phone: "4936595",
//         email: "pedro.martinez@example.com",
//         status: "ACTIVE",
//       },
//       {
//         dni: "10000006",
//         firstName: "Lucía",
//         lastName: "Fernández",
//         phone: "4936596",
//         email: "lucia.fernandez@example.com",
//         status: "ACTIVE",
//       },
//       {
//         dni: "10000007",
//         firstName: "Jorge",
//         lastName: "Suárez",
//         phone: "4936597",
//         email: "jorge.suarez@example.com",
//         status: "ACTIVE",
//       },
//       {
//         dni: "10000008",
//         firstName: "Sofía",
//         lastName: "Molina",
//         phone: "4936598",
//         email: "sofia.molina@example.com",
//         status: "ACTIVE",
//       },

//       // 1 SUSPENDED
//       {
//         dni: "10000009",
//         firstName: "Diego",
//         lastName: "Ramírez",
//         phone: "4936599",
//         email: "diego.ramirez@example.com",
//         status: "SUSPENDED",
//       },

//       // 1 INACTIVE
//       {
//         dni: "10000010",
//         firstName: "Elena",
//         lastName: "Castro",
//         phone: "4936600",
//         email: "elena.castro@example.com",
//         status: "INACTIVE",
//       },
//     ],
//   });

//   console.log("Seed completed.");
// }

// main()
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await db.$disconnect();
//   });




import "dotenv/config";
import { db } from "@/lib/db/prisma";

async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("Seeding affiliates...");

  await db.affiliate.createMany({
    data: [
      // ===== ACTIVE =====
      {
        dni: "10000001",
        affiliateNumber: "AFF-0001",
        firstName: "Juan",
        lastName: "Pérez",
        phone: "4936591",
        email: "juan.perez@example.com",
        organization: "Sindicato Argentino de Televisión",
        province: "Buenos Aires",
        city: "CABA",
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date("2024-01-10"),
      },
      {
        dni: "10000002",
        affiliateNumber: "AFF-0002",
        firstName: "María",
        lastName: "Gómez",
        phone: "4936592",
        email: "maria.gomez@example.com",
        organization: "Sindicato Argentino de Televisión",
        province: "Buenos Aires",
        city: "Avellaneda",
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date("2024-02-15"),
      },
      {
        dni: "10000003",
        affiliateNumber: "AFF-0003",
        firstName: "Carlos",
        lastName: "López",
        organization: "Empresa Constructora Delta",
        province: "Córdoba",
        city: "Córdoba",
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date("2023-11-01"),
      },
      {
        dni: "10000004",
        affiliateNumber: "AFF-0004",
        firstName: "Ana",
        lastName: "Rodríguez",
        organization: "Empresa Constructora Delta",
        province: "Santa Fe",
        city: "Rosario",
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date("2024-03-05"),
      },

      // ===== SUSPENDED =====
      {
        dni: "10000005",
        affiliateNumber: "AFF-0005",
        firstName: "Pedro",
        lastName: "Martínez",
        organization: "Sindicato Metalúrgico",
        province: "Buenos Aires",
        city: "La Plata",
        status: "SUSPENDED",
        statusReason: "DEBT",
        activatedAt: new Date("2022-06-01"),
        suspendedAt: new Date("2024-04-10"),
      },
      {
        dni: "10000006",
        affiliateNumber: "AFF-0006",
        firstName: "Lucía",
        lastName: "Fernández",
        organization: "Sindicato Metalúrgico",
        province: "Mendoza",
        city: "Mendoza",
        status: "SUSPENDED",
        statusReason: "MISSING_DOCUMENTATION",
        activatedAt: new Date("2023-08-20"),
        suspendedAt: new Date("2024-02-01"),
      },

      // ===== INACTIVE =====
      {
        dni: "10000007",
        affiliateNumber: "AFF-0007",
        firstName: "Jorge",
        lastName: "Suárez",
        organization: "Sindicato Argentino de Televisión",
        province: "Buenos Aires",
        city: "Quilmes",
        status: "INACTIVE",
        statusReason: "VOLUNTARY_LEAVE",
        activatedAt: new Date("2020-05-10"),
        inactivatedAt: new Date("2023-12-31"),
      },
      {
        dni: "10000008",
        affiliateNumber: "AFF-0008",
        firstName: "Sofía",
        lastName: "Molina",
        organization: "Empresa Logística Sur",
        province: "Neuquén",
        city: "Neuquén",
        status: "INACTIVE",
        statusReason: "ADMIN_DECISION",
        activatedAt: new Date("2021-03-15"),
        inactivatedAt: new Date("2024-01-20"),
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