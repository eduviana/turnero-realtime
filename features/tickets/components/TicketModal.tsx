"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Ticket } from "@/features/tickets/types/ticket";

interface TicketModalProps {
  ticket: Ticket;
  onClose: () => void;
}

export function TicketModal({ ticket, onClose }: TicketModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 100);

    const timeout = setTimeout(onClose, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onClose]);

  const formatted = new Date(ticket.createdAt).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-6 space-y-4 text-center">
        <VisuallyHidden>
          <DialogTitle>Ticket generado</DialogTitle>
        </VisuallyHidden>

        <h2 className="text-2xl font-bold">Turno generado</h2>

        <p className="text-5xl font-bold">{ticket.code}</p>
        <p className="text-lg text-gray-600">{ticket.service.name}</p>

        <p className="text-sm mt-2">Hora: {formatted}</p>

        <p className="text-xs text-gray-500 mt-4 border-t pt-2">
          Obra Social Ejemplo — Gracias por su visita
        </p>

        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            Imprimiendo ticket...
          </p>
        </div>

        <Button onClick={onClose} className="w-full mt-4">
          Finalizar ahora
        </Button>
      </DialogContent>
    </Dialog>
  );
}