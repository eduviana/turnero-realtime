"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { getAuditsOverTimeAction } from "../actions/getAuditsOverTimeAction";
import { AuditsOverTimeStat } from "../types/audit-stats";

export function AuditsOverTimeChart() {
  const [data, setData] = useState<AuditsOverTimeStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuditsOverTimeAction(30)
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-64 rounded-md border flex items-center justify-center text-sm text-muted-foreground">
        Cargando estadísticas…
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-64 rounded-md border flex items-center justify-center text-sm text-muted-foreground">
        No hay auditorías en este período
      </div>
    );
  }

  return (
    <div className="rounded-md border p-4 bg-white space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-black">
          Auditorías en el tiempo
        </h3>
        <p className="text-sm text-slate-500">
          Cantidad de eventos registrados por día
        </p>
      </div>

      {/* Chart */}
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={true}
              tickFormatter={(value) => {
                if (!value) return "";

                const date = value instanceof Date ? value : new Date(value);

                if (Number.isNaN(date.getTime())) return "";

                return date.toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                });
              }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [`${value ?? 0}`, "Eventos"]}
              labelFormatter={(label) => `Fecha: ${label}`}
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#2563eb" // blue-600
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
