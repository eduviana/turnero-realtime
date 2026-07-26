import { getServerSession } from "next-auth";
import { authConfig } from "./auth.config";

export { authConfig };
export { default as NextAuth } from "next-auth";

export async function getSession() {
  return getServerSession(authConfig);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}
