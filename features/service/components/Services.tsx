"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createTicket } from "@/features/tickets/services/createTicket";
import { Ticket } from "@/features/tickets/types/ticket";
import { TicketModal } from "@/features/tickets/components/TicketModal";
import { Service } from "../types/service";

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  const router = useRouter();

  const [createdTicket, setCreatedTicket] = useState<Ticket | null>(null);

  const serviceIcons: Record<string, string> = {
    A: "🩺",
    B: "💳",
    C: "🛠️",
    D: "🧾",
    P: "⭐️",
    FM: "💊",
    FNM: "🧴",
  };

  async function handleSelect(service: Service) {
    try {
      const ticket = await createTicket(service.id);
      setCreatedTicket(ticket);
    } catch {
      alert("No se pudo generar el ticket.");
    }
  }

  function onTicketPrinted() {
    sessionStorage.removeItem("affiliate_dni");
    setCreatedTicket(null);
    router.replace("/ingreso-afiliado");
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
