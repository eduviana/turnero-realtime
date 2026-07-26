import { ReactNode } from "react";
import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";


import { getOperatorServiceContext } from "@/features/operator-workspace/services/getOperatorServiceContext";
import { OperatorServiceProvider } from "@/features/operator-workspace/context/OperatorServiceContext";
import { OperatorServiceHeaderUserMenu } from "@/features/operator-workspace/components/OperatorServiceHeaderUserMenu";
import { OperatorTurnSidebarAdapter } from "@/features/operator-workspace/components/OperatorTurnSidebarAdapter";
import { PharmacyMedicationCartProvider } from "@/features/operator-workspace/areas/pharmacy-medications/context/PharmacyMedicationCartContext";
import { PharmacyGeneralCartProvider } from "@/features/operator-workspace/areas/pharmacy-general/context/PharmacyGeneralCartContext";

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
  const { serviceId } = await params;

  const sessionUser = await getCurrentUser();
  if (!sessionUser?.id) {
    redirect("/sign-in");
  }

  const serviceContext = await getOperatorServiceContext({
    userId: sessionUser.id,
    serviceId,
  });

  if (!serviceContext) {
    notFound();
  }

  const content = (
    <div className="min-h-screen flex flex-col">
      <div className="bg-blue-950">
        <div className="flex">
          <div className="w-80 shrink-0 pl-8 flex items-center h-16">
            <h1 className="text-white text-lg font-bold">
              {serviceContext.service.name}
            </h1>
          </div>
          <div className="flex-1 container mx-auto flex items-center justify-end h-16 px-8">
            <OperatorServiceHeaderUserMenu />
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <OperatorTurnSidebarAdapter />
        <main className="flex-1 container mx-auto py-6 px-8">
          {children}
        </main>
      </div>
    </div>
  );

  return (
    <OperatorServiceProvider value={serviceContext}>
      {serviceContext.service.code === "FM" ? (
        <PharmacyMedicationCartProvider>
          {content}
        </PharmacyMedicationCartProvider>
      ) : serviceContext.service.code === "FG" ? (
        <PharmacyGeneralCartProvider>
          {content}
        </PharmacyGeneralCartProvider>
      ) : (
        content
      )}
    </OperatorServiceProvider>
  );
}

