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
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="h-20 bg-blue-950 flex items-center justify-center px-8">
        <h1 className="text-3xl font-bold text-white text-center">
          Bienvenido{operatorName ? `, ${operatorName}` : ""}
        </h1>
      </header>

      {/* Cards */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-5xl">
          <div
            className="
        grid gap-6
        justify-center
        grid-cols-[repeat(auto-fit,minmax(280px,280px))]
      "
          >
            {services.map((service) => (
              <div key={service.userServiceId} className="aspect-square">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
