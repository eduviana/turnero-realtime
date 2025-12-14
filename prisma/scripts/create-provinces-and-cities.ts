import "dotenv/config";
import { db } from "@/lib/db/prisma";

async function main() {
  console.log("Seeding provinces and cities (Argentina)...");

  /**
   * Provincias argentinas + capitales provinciales
   * Fuente: INDEC / denominación oficial
   */

  const provinces = [
    { id: 1, name: "Buenos Aires", code: "BA" },
    { id: 2, name: "Ciudad Autónoma de Buenos Aires", code: "CABA" },
    { id: 3, name: "Catamarca", code: "CAT" },
    { id: 4, name: "Chaco", code: "CHA" },
    { id: 5, name: "Chubut", code: "CHU" },
    { id: 6, name: "Córdoba", code: "COR" },
    { id: 7, name: "Corrientes", code: "CRI" },
    { id: 8, name: "Entre Ríos", code: "ER" },
    { id: 9, name: "Formosa", code: "FOR" },
    { id: 10, name: "Jujuy", code: "JUJ" },
    { id: 11, name: "La Pampa", code: "LP" },
    { id: 12, name: "La Rioja", code: "LR" },
    { id: 13, name: "Mendoza", code: "MZA" },
    { id: 14, name: "Misiones", code: "MIS" },
    { id: 15, name: "Neuquén", code: "NEU" },
    { id: 16, name: "Río Negro", code: "RN" },
    { id: 17, name: "Salta", code: "SAL" },
    { id: 18, name: "San Juan", code: "SJ" },
    { id: 19, name: "San Luis", code: "SL" },
    { id: 20, name: "Santa Cruz", code: "SC" },
    { id: 21, name: "Santa Fe", code: "SF" },
    { id: 22, name: "Santiago del Estero", code: "SE" },
    { id: 23, name: "Tierra del Fuego", code: "TDF" },
    { id: 24, name: "Tucumán", code: "TUC" },
  ];

  const cities = [
  // Buenos Aires
  { name: "La Plata", provinceId: 1 },
  { name: "Avellaneda", provinceId: 1 },
  { name: "Quilmes", provinceId: 1 },

  // CABA
  { name: "Ciudad Autónoma de Buenos Aires", provinceId: 2 },

  // Capitales provinciales
  { name: "San Fernando del Valle de Catamarca", provinceId: 3 },
  { name: "Resistencia", provinceId: 4 },
  { name: "Rawson", provinceId: 5 },
  { name: "Córdoba", provinceId: 6 },
  { name: "Corrientes", provinceId: 7 },
  { name: "Paraná", provinceId: 8 },
  { name: "Formosa", provinceId: 9 },
  { name: "San Salvador de Jujuy", provinceId: 10 },
  { name: "Santa Rosa", provinceId: 11 },
  { name: "La Rioja", provinceId: 12 },
  { name: "Mendoza", provinceId: 13 },
  { name: "Posadas", provinceId: 14 },
  { name: "Neuquén", provinceId: 15 },
  { name: "Viedma", provinceId: 16 },
  { name: "Salta", provinceId: 17 },
  { name: "San Juan", provinceId: 18 },
  { name: "San Luis", provinceId: 19 },
  { name: "Río Gallegos", provinceId: 20 },

  // Santa Fe
  { name: "Santa Fe", provinceId: 21 },
  { name: "Rosario", provinceId: 21 },

  { name: "Santiago del Estero", provinceId: 22 },
  { name: "Ushuaia", provinceId: 23 },
  { name: "San Miguel de Tucumán", provinceId: 24 },
];
  await db.province.createMany({
    data: provinces,
  });

  await db.city.createMany({
    data: cities,
  });

  console.log("Provinces and cities seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});