// "use client";

// import { useClerk } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

// export function SignOutButton() {
//   const { signOut } = useClerk();

//   const handleSignOut = async () => {
//     await signOut({
//       redirectUrl: "/",
//     });
//   };

//   return (
//     <Button variant="ghost" onClick={handleSignOut}>
//       Cerrar sesión
//     </Button>
//   );
// }



"use client";

import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/" });
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="
        flex w-full items-center gap-3
        rounded-md px-3 py-2
        text-sm font-medium
        text-red-600
        hover:bg-red-50
        transition-colors
      "
    >
      <LogOut className="h-4 w-4" />
      <span>Cerrar sesión</span>
    </button>
  );
}