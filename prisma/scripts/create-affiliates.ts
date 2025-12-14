import "dotenv/config";
import { db } from "@/lib/db/prisma";

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

async function main() {
  console.log("Seeding affiliates...");

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

  await db.affiliate.createMany({
    data: [
      {
        dni: "10000001",
        affiliateNumber: "AFF-0001",
        firstName: "Juan",
        lastName: "Pérez",
        phone: "4936591",
        email: "juan.perez@example.com",
        organization: "Sindicato Argentino de Televisión",
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
        organization: "Sindicato Argentino de Televisión",
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
        organization: "Empresa Constructora Delta",
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
        organization: "Empresa Constructora Delta",
        ...rosario,
        status: "ACTIVE",
        statusReason: "NONE",
        activatedAt: new Date("2024-03-05"),
      },
      {
        dni: "10000005",
        affiliateNumber: "AFF-0005",
        firstName: "Pedro",
        lastName: "Martínez",
        organization: "Sindicato Metalúrgico",
        ...laPlata,
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
        ...mendoza,
        status: "SUSPENDED",
        statusReason: "MISSING_DOCUMENTATION",
        activatedAt: new Date("2023-08-20"),
        suspendedAt: new Date("2024-02-01"),
      },
      {
        dni: "10000007",
        affiliateNumber: "AFF-0007",
        firstName: "Jorge",
        lastName: "Suárez",
        organization: "Sindicato Argentino de Televisión",
        ...quilmes,
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
        ...neuquen,
        status: "INACTIVE",
        statusReason: "ADMIN_DECISION",
        activatedAt: new Date("2021-03-15"),
        inactivatedAt: new Date("2024-01-20"),
      },
    ],
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
