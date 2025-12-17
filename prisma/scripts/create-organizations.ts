import "dotenv/config";
import { db } from "@/lib/db/prisma";

// Seed de organizaciones
async function main() {
  console.log("Seeding organizations...");

  await db.organization.createMany({
    data: [
      { name: "Sindicato Argentino de Televisión" },
      { name: "Sindicato Metalúrgico" },
      { name: "Sindicato de Empleados de Comercio" },
      { name: "Sindicato de la Construcción" },
      { name: "Sindicato de Trabajadores de la Salud" },
      { name: "Sindicato de Transporte Automotor" },

      { name: "Empresa Constructora Delta" },
      { name: "Empresa Logística Sur" },
      { name: "Grupo Industrial Andino" },
      { name: "Servicios Integrales Patagonia" },
      { name: "Tecnologías del Plata S.A." },
      { name: "Soluciones Informáticas Norte" },

      { name: "Cooperativa de Trabajo Horizonte" },
      { name: "Cooperativa Obrera del Sur" },
      { name: "Cooperativa de Servicios Unidos" },

      { name: "Obra Social Federal" },
      { name: "Obra Social del Personal Técnico" },
      { name: "Obra Social de la Industria Nacional" },

      { name: "Fundación Desarrollo Social" },
      { name: "Asociación Civil Progreso" },
    ],
    skipDuplicates: true, // 🔑 idempotente
  });

  console.log("Organizations seeded successfully.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });