import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getOperatorServices } from "@/features/operator-workspace/services/getOperatorServices";
import { ServiceCard } from "@/features/operator-workspace/components/ServiceCard";
import { OperatorDashboardHeader } from "@/features/operator-workspace/components/OperatorDashboardHeader";

export default async function OperatorDashboardPage() {
  const sessionUser = await getCurrentUser();

  if (!sessionUser?.id) {
    redirect("/sign-in");
  }

  const { operatorName, lastName, role, profileImage, services } =
    await getOperatorServices(sessionUser.id);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <header className="flex h-16 items-center justify-between border-b border-border bg-white px-8 shrink-0">
        <h1 className="font-black text-xl tracking-tighter italic text-[#1e293b]">
          Medical-Healt
        </h1>

        <OperatorDashboardHeader
          firstName={operatorName}
          lastName={lastName}
          role={role}
          profileImage={profileImage}
        />
      </header>

      {/* Welcome */}
      <div className="text-center px-8 pt-6 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          Bienvenido, {operatorName ?? "Operador"}
        </h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Seleccione el servicio que desea gestionar hoy para comenzar con la operación clínica.
        </p>
      </div>

      {/* Cards */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-5xl">
          <div className="grid gap-6 justify-center grid-cols-[repeat(auto-fit,minmax(320px,320px))]">
            {services.map((service) => (
              <div key={service.userServiceId} className="h-[295px]">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
