import { db } from "@/lib/db/prisma";
import type { UserWithStatus } from "../types/users";

export async function getAllUsers(): Promise<UserWithStatus[]> {
  return db.user.findMany({
    include: {
      userStatus: {
        select: {
          isOnline: true,
          lastActivityAt: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}