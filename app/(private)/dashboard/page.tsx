import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db/prisma";

export default async function DashboardRedirectPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user) {
    redirect("/sign-in");
  }

  switch (user.role) {
    case "ADMIN":
      redirect("/admin/dashboard");

    case "SUPERVISOR":
      redirect("/supervisor/dashboard");

    case "OPERATOR":
      redirect("/operator/dashboard");

    default:
      redirect("/sign-in");
  }
}