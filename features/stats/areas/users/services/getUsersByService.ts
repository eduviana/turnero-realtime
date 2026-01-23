import { db } from "@/lib/db/prisma";


export async function getUsersByService() {
  const services = await db.service.findMany({
    select: {
      id: true,
      name: true,
      operators: {
        where: {
          isActive: true,
          unassignedAt: null,
        },
        select: {
          userId: true,
        },
      },
    },
  });

  return services.map((service) => ({
    serviceId: service.id,
    serviceName: service.name,
    usersCount: service.operators.length,
  }));
}