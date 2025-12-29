import { UserPresenceStatus } from "@/lib/userPresence";

export interface UserServiceAssignment {
  id: string;
  isPrimary: boolean;
  isActive: boolean;

  service: {
    id: string;
    name: string;
    code: string; // 👈 agregar
  };
}

export interface UserWithStatus {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;

  userStatus: {
    lastActivityAt: Date | null;
  } | null;

  services: UserServiceAssignment[];
}


export interface UserTableRow {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  role: string;
  createdAt: string;

  lastActivityAt: Date | null;

  serviceCodes: string[];
  presenceStatus: UserPresenceStatus;
}