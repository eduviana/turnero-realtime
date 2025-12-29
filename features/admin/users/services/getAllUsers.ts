import { db } from "@/lib/db/prisma";
import type { UserWithStatus } from "../types/users";

export async function getAllUsers(): Promise<UserWithStatus[]> {
  return db.user.findMany({
    where: {
      deletedAt: null,
    },

    include: {
      userStatus: {
        select: {
          lastActivityAt: true,
        },
      },

      services: {
        where: {
          isActive: true,
        },
        include: {
          service: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "asc",
    },
  });
}