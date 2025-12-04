import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Crear pool de PostgreSQL
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Adaptador requerido en Prisma 7
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error"]
        : ["error"],
  });

// **AGREGAR ESTE ALIAS**
export const db = prisma;

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}