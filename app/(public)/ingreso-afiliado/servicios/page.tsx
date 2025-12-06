"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ServiceItem } from "@/features/affiliate-login/types/services";
import { getAllServices } from "@/features/affiliate-login/services/getAllServices";
import { createTicket } from "@/features/tickets/services/createTicket";
import { Ticket } from "@/features/tickets/types/ticket";
import { TicketModal } from "@/features/tickets/components/TicketModal";

export default function ServiciosPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [createdTicket, setCreatedTicket] = useState<Ticket | null>(null);
  const router = useRouter();

  const serviceIcons: Record<string, string> = {
    A: "🩺",
    B: "💳",
    C: "🛠️",
    D: "🧾",
    P: "⭐️",
    FM: "💊",
    FNM: "🧴",
  };

  useEffect(() => {
    getAllServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  async function handleSelect(service: ServiceItem) {
    try {
      const ticket = await createTicket(service.id);
      setCreatedTicket(ticket);
    } catch {
      alert("No se pudo generar el ticket.");
    }
  }

  function onTicketPrinted() {
    sessionStorage.removeItem("affiliate_dni"); // limpiar el dni almacenado

    setCreatedTicket(null);
    router.replace("/ingreso-afiliado");
  }



  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center text-xl">
        Cargando servicios...
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen p-8 max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">
          Seleccione un servicio
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleSelect(service)}
              className="
                group
                rounded-2xl border shadow-md bg-white
                p-6 flex flex-col items-center justify-center
                gap-4
                transition-all duration-200
                hover:shadow-lg hover:border-gray-300
                active:scale-[0.98]
                focus:outline-none
                focus:ring-4 focus:ring-blue-200
                h-48
              "
            >
              <div className="text-4xl" aria-hidden="true">
                {serviceIcons[service.code] ?? "🟦"}
              </div>

              <div className="text-center">
                <p className="text-xl font-semibold">{service.name}</p>
                {service.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {service.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </main>

      {createdTicket && (
        <TicketModal ticket={createdTicket} onClose={onTicketPrinted} />
      )}
    </>
  );
}
