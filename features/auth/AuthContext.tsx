"use client";

import { createContext, useContext } from "react";
import { Role } from "@/generated/prisma/enums";

interface AuthContextValue {
  role: Role;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={{ role }}>
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