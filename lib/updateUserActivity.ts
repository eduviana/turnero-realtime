

import { db } from "@/lib/db/prisma";

/**
 * Registra actividad real del usuario.
 * Usar únicamente en acciones de negocio (no auth).
 * Fuente de verdad para presencia.
 */
export async function updateUserActivity(userId: string): Promise<void> {
  if (!userId) return;

  const now = new Date();

  await db.userStatus.upsert({
    where: { userId },
    update: {
      lastActivityAt: now,
    },
    create: {
      userId,
      lastActivityAt: now,
    },
  });
}