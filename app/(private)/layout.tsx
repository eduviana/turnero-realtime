// import { Sidebar } from "@/components/layout/sidebar";
// import { Header } from "@/components/layout/header";
// import { MainWrapper } from "@/components/layout/main-wrapper";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db/prisma";

// export default async function PrivateLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { userId } = auth();

//   const user = await db.user.findUnique({
//     where: { clerkId: userId },
//     select: { role: true },
//   });
//   return (
//     <div className="min-h-screen flex bg-slate-50">
//       <Sidebar />

//       <div className="flex flex-1 flex-col min-h-screen">
//         <Header />
//         <MainWrapper>{children}</MainWrapper>
//       </div>
//     </div>
//   );
// }

import { MainWrapper } from "@/components/layout/MainWrapper";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // Si no hay sesión, redirigís a login
  if (!userId) {
    redirect("/sign-in");
  }

  // Obtenés el rol desde tu BD
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  // Si el usuario no existe en tu base, hay un problema en el webhook o sync
  if (!user) {
    // Podés lanzar throw, mostrar mensaje o redirigir
    throw new Error("User not found in database");
  }

  const role = user.role;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Pasar explícitamente el rol */}
      <Sidebar accountRole={role} />

      <div className="flex flex-1 flex-col min-h-screen">
        <Header />
        <MainWrapper>{children}</MainWrapper>
      </div>
    </div>
  );
}
