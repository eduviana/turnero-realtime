import { db } from "@/lib/db/prisma";


export async function getAllServices() {
  const services = await db.service.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return services;
}