
import { User } from "@/generated/prisma/client";
import type { UserTableRow } from "../types/users";

export function toUserTableRow(user: User): UserTableRow {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImage: user.profileImage,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
  };
}