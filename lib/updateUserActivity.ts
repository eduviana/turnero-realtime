import { db } from "@/lib/db/prisma";

/**
 * Registra actividad real del usuario.
 * Usar únicamente en acciones de negocio (no en auth).
 */
export async function updateUserActivity(userId: string): Promise<void> {
  if (!userId) return;

  const now = new Date();

  await db.userStatus.upsert({
    where: { userId },
    update: {
      lastActivityAt: now,
      isOnline: true,
    },
    create: {
      userId,
      isOnline: true,
      lastActivityAt: now,
    },
  });
}