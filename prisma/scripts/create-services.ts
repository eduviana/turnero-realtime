import "dotenv/config";
import { db } from "@/lib/db/prisma";


// Seed de servicios
async function main() {
  console.log("Seeding services...");

  await db.service.createMany({
    data: [
      {
        name: "Atención al Cliente",
        code: "AC",
        description: "Gestiones generales, consultas, cambios de datos personales.",
      },
      {
        name: "Pagos y Facturación",
        code: "PF",
        description: "Pagos, facturas, planes y deudas.",
      },
      // {
      //   name: "Soporte Técnico",
      //   code: "ST",
      //   description: "Problemas técnicos, instalaciones, mantenimiento.",
      // },
      {
        name: "Afiliaciones",
        code: "AF",
        description: "Altas, bajas, renovaciones y gestiones de afiliados.",
      },
      {
        name: "Atención Prioritaria",
        code: "AP",
        description: "Personas con prioridad: mayores, embarazadas, movilidad reducida.",
      },
      {
        name: "Farmacia Medicamentos",
        code: "FM",
        description: "Dispensación de medicamentos con cobertura.",
      },
      {
        name: "Farmacia General",
        code: "FG",
        description: "Productos de perfumería, cosmética y artículos sin cobertura.",
      },
    ],
  });

  console.log("Services seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});