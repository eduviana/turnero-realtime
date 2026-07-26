import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { RecentTicketItem } from "../types/dashboard";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pendiente",
  WAITING: "Esperando",
  CALLED: "Llamado",
  IN_PROGRESS: "En atención",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
  NO_SHOW: "No show",
};

const STATUS_COLOR: Record<string, string> = {
  PENDING: "text-amber-600",
  WAITING: "text-blue-600",
  CALLED: "text-violet-600",
  IN_PROGRESS: "text-blue-600",
  COMPLETED: "text-emerald-600",
  CANCELLED: "text-red-600",
  NO_SHOW: "text-slate-400",
};

interface RecentTicketsTableProps {
  tickets: RecentTicketItem[];
}

export function RecentTicketsTable({ tickets }: RecentTicketsTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-slate-400 text-sm">
        No hay turnos registrados hoy
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="px-4 py-3 font-medium">Código</th>
              <th className="px-4 py-3 font-medium">Servicio</th>
              <th className="px-4 py-3 font-medium">Afiliado</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Hora</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr
                key={t.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-800">
                  {t.code}
                </td>
                <td className="px-4 py-3 text-slate-700">{t.serviceName}</td>
                <td className="px-4 py-3 text-slate-600">
                  {t.affiliateName ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium ${STATUS_COLOR[t.status] ?? "text-slate-500"}`}
                  >
                    {STATUS_LABEL[t.status] ?? t.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">
                  {t.createdAt.toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end border-t px-4 py-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/estadisticas">Ver estadísticas</Link>
        </Button>
      </div>
    </div>
  );
}
