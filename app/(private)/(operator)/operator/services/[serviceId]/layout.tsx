import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";

import { getOperatorServiceContext } from "@/features/operator-workspace/services/getOperatorServiceContext";
import { OperatorServiceProvider } from "@/features/operator-workspace/context/OperatorServiceContext";
import { TurnQueuePanel } from "@/features/turn-queue/components/TurnQueuePanel";
import { OperatorServiceHeader } from "@/features/operator-workspace/components/OperatorServiceHeader";
import { PharmacyMedicationCartProvider } from "@/features/operator-workspace/areas/pharmacy-medications/context/PharmacyMedicationCartContext";

interface OperatorServiceLayoutProps {
  children: ReactNode;
  params: Promise<{
    serviceId: string;
  }>;
}

export default async function OperatorServiceLayout({
  children,
  params,
}: OperatorServiceLayoutProps) {
  // ✅ unwrap params (Next 15)
  const { serviceId } = await params;

  // 1️⃣ Autenticación
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  // 2️⃣ Resolver contexto del servicio + autorización
  const serviceContext = await getOperatorServiceContext({
    clerkUserId: userId,
    serviceId,
  });

  // 3️⃣ Acceso inválido
  if (!serviceContext) {
    notFound();
  }

  const content = (
    <div className="min-h-screen">
      <OperatorServiceHeader />

      <main className="container mx-auto mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_320px]">
        {/* Columna izquierda: contenido del servicio */}
        <div>{children}</div>

        {/* Columna derecha: turnos */}
        <aside className="flex justify-end">
          <TurnQueuePanel />
        </aside>
      </main>
    </div>
  );

  return (
    <OperatorServiceProvider value={serviceContext}>
      {serviceContext.service.code === "FM" ? (
        <PharmacyMedicationCartProvider>
          {content}
        </PharmacyMedicationCartProvider>
      ) : (
        content
      )}
    </OperatorServiceProvider>
  );
}
