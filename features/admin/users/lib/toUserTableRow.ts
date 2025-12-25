import type { UserWithStatus } from "../types/users";
import type { UserTableRow } from "../types/users";

export function toUserTableRow(user: UserWithStatus): UserTableRow {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImage: user.profileImage,
    role: user.role,
    createdAt: user.createdAt.toISOString(),

    isOnline: user.userStatus?.isOnline ?? false,
    lastActivityAt: user.userStatus?.lastActivityAt ?? null,
  };
}