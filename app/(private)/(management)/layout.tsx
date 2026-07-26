import { redirect } from "next/navigation";
import { db } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MainWrapper } from "@/components/layout/MainWrapper";
import { AuthProvider } from "@/features/auth/AuthContext";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await getCurrentUser();

  if (!sessionUser?.email) {
    redirect("/sign-in");
  }

  let user = await db.user.findFirst({
    where: {
      email: sessionUser.email,
      deletedAt: null,
    },
    select: {
      role: true,
      firstName: true,
      lastName: true,
      profileImage: true,
    },
  });

  if (!user) {
    redirect("/sign-in");
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
        <Sidebar accountRole={user.role} />

        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <MainWrapper>{children}</MainWrapper>
        </div>
      </AuthProvider>
    </div>
  );
}