import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";

import { getOperatorServiceContext } from "@/features/operator-workspace/services/getOperatorServiceContext";
import { OperatorServiceProvider } from "@/features/operator-workspace/context/OperatorServiceContext";
import { TurnQueuePanel } from "@/features/operator-workspace/components/TurnQueuePanel";

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
  // ✅ UNWRAP params (clave del problema)
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

  // 3️⃣ Acceso inválido o servicio no asociado
  if (!serviceContext) {
    notFound();
  }

  // 4️⃣ Layout compartido del servicio
  return (
    <OperatorServiceProvider value={serviceContext}>
      <div className="min-h-screen p-6">
        {/* Header + turnos */}
        <header className="mb-6 flex items-start justify-between gap-6 bg-red-100">
          <div>
            <h1 className="text-2xl font-bold">
              {serviceContext.service.name}
            </h1>

            {serviceContext.service.description && (
              <p className="text-sm text-muted-foreground">
                {serviceContext.service.description}
              </p>
            )}
          </div>

          <TurnQueuePanel serviceCode={serviceContext.service.code} />
        </header>

        {/* Vista específica del servicio */}
        <main>{children}</main>
      </div>
    </OperatorServiceProvider>
  );
}