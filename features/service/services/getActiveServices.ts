import { db } from "@/lib/db/prisma";

export async function getActiveServices() {
  const services = await db.service.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return services;
}
