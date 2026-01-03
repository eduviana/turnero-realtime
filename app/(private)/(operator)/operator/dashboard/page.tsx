import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getOperatorServices } from "@/features/operator-workspace/services/getOperatorServices";
import { ServiceCard } from "@/features/operator-workspace/components/ServiceCard";

export default async function OperatorDashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { operatorName, services } = await getOperatorServices(userId);

  return (
    <div className="min-h-screen relative">
      {/* Título flotante */}
      <header className="absolute top-16 left-0 right-0 px-8">
        <h1 className="text-3xl font-bold text-center">
          Bienvenido{operatorName ? `, ${operatorName}` : ""}
        </h1>
      </header>

      {/* Cards centradas REALMENTE */}
      <main className="min-h-screen flex items-center justify-center px-8">
        <div className="w-full max-w-5xl">
          <div className="grid gap-6 justify-center grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            {services.map((service) => (
              <ServiceCard key={service.userServiceId} service={service} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
