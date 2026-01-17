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

  const layoutContent = (
  <div className="min-h-screen space-y-4">
    <OperatorServiceHeader />

    {/* TurnQueuePanel a la derecha */}
    <div className="flex justify-end container mx-auto">
      <TurnQueuePanel />
    </div>

    <main>{children}</main>
  </div>
);

  // 4️⃣ Layout compartido del servicio
  return (
  <OperatorServiceProvider value={serviceContext}>
    {serviceContext.service.code === "FM" ? (
      <PharmacyMedicationCartProvider>
        {layoutContent}
      </PharmacyMedicationCartProvider>
    ) : (
      layoutContent
    )}
  </OperatorServiceProvider>
);
}
