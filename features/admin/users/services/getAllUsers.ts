import { db } from "@/lib/db/prisma";


export async function getAllUsers() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return users;
}