


import { Ticket } from "../types/ticket";

export async function createTicket(serviceId: string): Promise<Ticket> {
  const res = await fetch("/api/tickets/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ serviceId }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error al crear ticket: ${error}`);
  }

  return res.json();
}