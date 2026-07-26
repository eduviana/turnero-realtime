import type { DashboardTicketStats } from "../types/dashboard";

interface TicketsMetricsBarProps {
  stats: DashboardTicketStats;
}

export function TicketsMetricsBar({ stats }: TicketsMetricsBarProps) {
  const items = [
    { label: "Turnos hoy", value: stats.todayTotal, color: "text-slate-900" },
    { label: "Pendientes", value: stats.pending, color: "text-amber-600" },
    { label: "En atención", value: stats.inProgress, color: "text-blue-600" },
    { label: "Completados", value: stats.completed, color: "text-emerald-600" },
    { label: "Cancelados", value: stats.cancelled, color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border bg-white p-4 flex flex-col items-center gap-1 shadow-xs"
        >
          <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          <p className="text-xs text-slate-500">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
