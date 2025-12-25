"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut({
      redirectUrl: "/",
    });
  };

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      Cerrar sesión
    </Button>
  );
}