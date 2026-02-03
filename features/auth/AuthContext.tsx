"use client";

import { createContext, useContext } from "react";
import { Role } from "@/generated/prisma/enums";

export interface AuthUser {
  role: Role;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
}

interface AuthContextValue {
  user: AuthUser;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  user,
  children,
}: {
  user: AuthUser;
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return ctx;
}