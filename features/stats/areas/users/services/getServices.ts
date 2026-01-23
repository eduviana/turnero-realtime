import { db } from "@/lib/db/prisma";

export async function getServices() {
  return db.service.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}