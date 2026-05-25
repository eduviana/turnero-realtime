import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db/prisma";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MainWrapper } from "@/components/layout/MainWrapper";
import { AuthProvider } from "@/features/auth/AuthContext";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Buscar usuario activo (no soft-deleted)
  let user = await db.user.findFirst({
    where: {
      clerkId: userId,
      deletedAt: null,
    },
    select: {
      role: true,
      firstName: true,
      lastName: true,
      profileImage: true,
    },
  });

  // 🔐 Fallback: crear usuario si no existe
  if (!user) {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    const email = clerkUser.primaryEmailAddressId
      ? clerkUser.emailAddresses.find(
          (e) => e.id === clerkUser.primaryEmailAddressId
        )?.emailAddress ?? null
      : null;

    user = await db.user.create({
      data: {
        clerkId: userId,
        email,
        firstName: clerkUser.firstName ?? null,
        lastName: clerkUser.lastName ?? null,
        profileImage: clerkUser.imageUrl ?? null,
        role: "OPERATOR",
      },
      select: {
        role: true,
        firstName: true,
        lastName: true,
        profileImage: true,
      },
    });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <AuthProvider
        user={{
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
        }}
      >
        {/* Sidebar sigue recibiendo la info sin volverse client */}
        <Sidebar accountRole={user.role} />

        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <MainWrapper>{children}</MainWrapper>
        </div>
      </AuthProvider>
    </div>
  );
}