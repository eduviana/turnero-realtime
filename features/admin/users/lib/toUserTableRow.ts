import type { UserWithStatus, UserTableRow } from "../types/users";
import { calculateUserPresence } from "@/lib/userPresence";

export function toUserTableRow(user: UserWithStatus): UserTableRow {
  const activeServices = user.services.filter((us) => us.isActive);

  const presence = calculateUserPresence(
    user.userStatus?.lastActivityAt
  );

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImage: user.profileImage,
    role: user.role,
    createdAt: user.createdAt.toISOString(),

    lastActivityAt: user.userStatus?.lastActivityAt ?? null,
    presenceStatus: presence.status,

    serviceCodes: activeServices.map((us) => us.service.code),
  };
}