// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// type Props = {
//   data: {
//     serviceName: string;
//     totalTickets: number;
//   }[];
// };

// export function TicketsByServiceChart({ data }: Props) {
//   return (
//     <div className="rounded-md border p-4 bg-white space-y-4">
//       <div>
//         <h3 className="text-lg font-bold">Turnos por servicio</h3>
//         <p className="text-sm text-slate-500 mt-1">
//           Cantidad total de turnos generados
//         </p>
//       </div>

//       <ResponsiveContainer width="100%" height={320}>
//         <BarChart
//           data={data}
//           layout="vertical"
//           margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
//         >
//           <XAxis
//             type="number"
//             allowDecimals={false}
//             tick={{ fill: "#94a3b8", fontSize: 14 }}
//           />

//           <YAxis
//             type="category"
//             dataKey="serviceName"
//             width={200}
//             tick={{ fill: "#94a3b8", fontSize: 14 }}
//           />

//           <Tooltip />

//           <Bar
//             dataKey="totalTickets"
//             radius={[0, 4, 4, 0]}
//             fill="#0f172a" // slate-900
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useTransition } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TicketsByServiceMetric } from "../types/types";

type ChartItem = {
  service: string;
  value: number;
};

type Props = {
  initialData: ChartItem[];
  onMetricChange: (metric: TicketsByServiceMetric) => Promise<ChartItem[]>;
};

const METRIC_LABELS: Record<TicketsByServiceMetric, string> = {
  total: "Total de turnos",
  completed: "Turnos completados",
  cancelled: "Turnos cancelados",
  no_show: "No show",
};

export function TicketsByServiceChart({ initialData, onMetricChange }: Props) {
  const [metric, setMetric] = useState<TicketsByServiceMetric>("completed");
  const [data, setData] = useState<ChartItem[]>(initialData);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await onMetricChange(metric);
      setData(result);
    });
  }, [metric, onMetricChange]);

  return (
    <div className="space-y-4 rounded-md border p-4 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-0 mb-8">
          <h3 className="text-lg font-bold text-black dark:text-white">
            Turnos por servicio
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {METRIC_LABELS[metric]}
          </p>
        </div>
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as TicketsByServiceMetric)}
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value="total">Total</option>
          <option value="completed">Completados</option>
          <option value="cancelled">Cancelados</option>
          <option value="no_show">No show</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{
                fill: "#94a3b8", // slate-400
                fontSize: 14,
              }}
            />
            <YAxis
              dataKey="service"
              type="category"
              width={180}
              tick={{
                fill: "#94a3b8", // slate-400
                fontSize: 14,
              }}
            />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="#0f172a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {isPending && <p className="text-xs text-muted-foreground">Cargando…</p>}
    </div>
  );
}
