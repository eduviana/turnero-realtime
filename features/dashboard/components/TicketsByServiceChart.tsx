"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TicketsByServiceItem } from "../types/dashboard";

interface TicketsByServiceChartProps {
  data: TicketsByServiceItem[];
}

export function TicketsByServiceChart({ data }: TicketsByServiceChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-slate-400 text-sm">
        No hay turnos registrados hoy
      </div>
    );
  }

  const chartData = data.map((d) => ({
    service: d.serviceCode,
    value: d.count,
    fullName: d.serviceName,
  }));

  return (
    <div className="rounded-xl border bg-white p-4 shadow-xs h-full flex flex-col">
      <h3 className="text-sm font-semibold text-slate-700 mb-3">
        Turnos por servicio (hoy)
      </h3>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="horizontal">
            <XAxis
              type="category"
              dataKey="service"
              tick={{ fill: "#475569", fontSize: 11 }}
              interval={0}
              height={30}
            />
            <YAxis
              type="number"
              allowDecimals={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <Tooltip labelFormatter={(label) => {
              const item = chartData.find((d) => d.service === label);
              return item?.fullName ?? label;
            }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#1e40af" barSize={54} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
