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
    AC: "🩺",
    PF: "💳",
    AF: "🧾",
    AP: "⭐️",
    FM: "💊",
    FG: "🧴",
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
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-5xl space-y-8">
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
                px-6 flex flex-col items-center justify-center
                gap-4
                transition-all duration-200
                hover:shadow-lg hover:border-gray-300
                active:scale-[0.98]
                focus:outline-none
                focus:ring-4 focus:ring-blue-200
                h-64
              "
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                <span className="text-3xl leading-none">
                  {serviceIcons[service.code] ?? "🟦"}
                </span>
              </div>

              <div className="text-center">
                <p className="text-xl font-semibold">{service.name}</p>
                {service.description && (
                    <p className="text-sm text-gray-600 mt-2">
                    {service.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      </main>

      {createdTicket && (
        <TicketModal ticket={createdTicket} onClose={onTicketPrinted} />
      )}
    </>
  );
}
