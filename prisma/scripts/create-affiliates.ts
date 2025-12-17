import "dotenv/config";
import { db } from "@/lib/db/prisma";

/**
 * Obtiene provinceId y cityId a partir de nombres
 */
async function getCity(provinceName: string, cityName: string) {
  const province = await db.province.findUnique({
    where: { name: provinceName },
  });

  if (!province) {
    throw new Error(`Province not found: ${provinceName}`);
  }

  const city = await db.city.findUnique({
    where: {
      name_provinceId: {
        name: cityName,
        provinceId: province.id,
      },
    },
  });

  if (!city) {
    throw new Error(`City not found: ${cityName} (${provinceName})`);
  }

  return { provinceId: province.id, cityId: city.id };
}

/**
 * Obtiene organizationId a partir del nombre
 */
async function getOrganizationId(name: string): Promise<number> {
  const organization = await db.organization.findUnique({
    where: { name },
  });

  if (!organization) {
    throw new Error(`Organization not found: ${name}`);
  }

  return organization.id;
}

async function main() {
  console.log("Seeding affiliates...");

  // ─────────────────────────────
  // Localidades
  // ─────────────────────────────
  const caba = await getCity(
    "Ciudad Autónoma de Buenos Aires",
    "Ciudad Autónoma de Buenos Aires"
  );

  const avellaneda = await getCity("Buenos Aires", "Avellaneda");
  const quilmes = await getCity("Buenos Aires", "Quilmes");
  const laPlata = await getCity("Buenos Aires", "La Plata");

  const cordoba = await getCity("Córdoba", "Córdoba");
  const rosario = await getCity("Santa Fe", "Rosario");
  const mendoza = await getCity("Mendoza", "Mendoza");
  const neuquen = await getCity("Neuquén", "Neuquén");

  // ─────────────────────────────
  // Organizaciones (todas)
  // ─────────────────────────────
  const satId = await getOrganizationId("Sindicato Argentino de Televisión");
  const metalurgicoId = await getOrganizationId("Sindicato Metalúrgico");
  const comercioId = await getOrganizationId(
    "Sindicato de Empleados de Comercio"
  );
  const construccionId = await getOrganizationId(
    "Sindicato de la Construcción"
  );
  const saludId = await getOrganizationId(
    "Sindicato de Trabajadores de la Salud"
  );
  const transporteId = await getOrganizationId(
    "Sindicato de Transporte Automotor"
  );

  const constructoraDeltaId = await getOrganizationId(
    "Empresa Constructora Delta"
  );
  const logisticaSurId = await getOrganizationId("Empresa Logística Sur");
  const grupoAndinoId = await getOrganizationId("Grupo Industrial Andino");
  const serviciosPatagoniaId = await getOrganizationId(
    "Servicios Integrales Patagonia"
  );
  const techPlataId = await getOrganizationId("Tecnologías del Plata S.A.");
  const solucionesNorteId = await getOrganizationId(
    "Soluciones Informáticas Norte"
  );

  const coopHorizonteId = await getOrganizationId(
    "Cooperativa de Trabajo Horizonte"
  );
  const coopSurId = await getOrganizationId("Cooperativa Obrera del Sur");
  const coopUnidosId = await getOrganizationId(
    "Cooperativa de Servicios Unidos"
  );

  const obraFederalId = await getOrganizationId("Obra Social Federal");
  const obraTecnicaId = await getOrganizationId(
    "Obra Social del Personal Técnico"
  );
  const obraIndustriaId = await getOrganizationId(
    "Obra Social de la Industria Nacional"
  );

  const fundacionId = await getOrganizationId("Fundación Desarrollo Social");
  const asociacionId = await getOrganizationId("Asociación Civil Progreso");

  // ─────────────────────────────
  // Afiliados
  // ─────────────────────────────
  await db.affiliate.createMany({
    data: [
      // ─────────────────────────────
      // EXISTENTES
      // ─────────────────────────────
      {
        dni: "10000001",
        affiliateNumber: "AFF-0001",
        firstName: "Juan",
        lastName: "Pérez",
        phone: "4936591",
        email: "juan.perez@example.com",
        organizationId: satId,
        ...caba,
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
        organizationId: satId,
        ...avellaneda,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date("2024-02-15"),
      },
      {
        dni: "10000003",
        affiliateNumber: "AFF-0003",
        firstName: "Carlos",
        lastName: "López",
        organizationId: constructoraDeltaId,
        ...cordoba,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date("2023-11-01"),
      },
      {
        dni: "10000004",
        affiliateNumber: "AFF-0004",
        firstName: "Ana",
        lastName: "Rodríguez",
        organizationId: constructoraDeltaId,
        ...rosario,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date("2024-03-05"),
      },

      // ─────────────────────────────
      // NUEVOS – uno por organización faltante
      // ─────────────────────────────
      {
        dni: "10000005",
        affiliateNumber: "AFF-0005",
        firstName: "Pedro",
        lastName: "Martínez",
        organizationId: metalurgicoId,
        ...laPlata,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date(),
      },
      {
        dni: "10000006",
        affiliateNumber: "AFF-0006",
        firstName: "Lucía",
        lastName: "Fernández",
        organizationId: logisticaSurId,
        ...mendoza,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date(),
      },
      {
        dni: "10000007",
        affiliateNumber: "AFF-0007",
        firstName: "Jorge",
        lastName: "Suárez",
        organizationId: grupoAndinoId,
        ...cordoba,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date(),
      },
      {
        dni: "10000008",
        affiliateNumber: "AFF-0008",
        firstName: "Sofía",
        lastName: "Molina",
        organizationId: serviciosPatagoniaId,
        ...neuquen,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date(),
      },
      {
        dni: "10000009",
        affiliateNumber: "AFF-0009",
        firstName: "Luis",
        lastName: "Benítez",
        organizationId: techPlataId,
        ...caba,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date(),
      },
      {
        dni: "10000010",
        affiliateNumber: "AFF-0010",
        firstName: "Paula",
        lastName: "Ramos",
        organizationId: solucionesNorteId,
        ...quilmes,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date(),
      },
      {
        dni: "10000011",
        affiliateNumber: "AFF-0011",
        firstName: "Héctor",
        lastName: "Silva",
        organizationId: coopSurId,
        ...rosario,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date(),
      },
      {
        dni: "10000012",
        affiliateNumber: "AFF-0012",
        firstName: "Marta",
        lastName: "Quiroga",
        organizationId: coopUnidosId,
        ...avellaneda,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date(),
      },
      {
        dni: "10000013",
        affiliateNumber: "AFF-0013",
        firstName: "Diego",
        lastName: "Navarro",
        organizationId: obraTecnicaId,
        ...laPlata,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date(),
      },
      {
        dni: "10000014",
        affiliateNumber: "AFF-0014",
        firstName: "Rocío",
        lastName: "Méndez",
        organizationId: obraIndustriaId,
        ...mendoza,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date(),
      },
      {
        dni: "10000015",
        affiliateNumber: "AFF-0015",
        firstName: "Esteban",
        lastName: "Correa",
        organizationId: asociacionId,
        ...neuquen,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  console.log("Affiliates seeded successfully.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
