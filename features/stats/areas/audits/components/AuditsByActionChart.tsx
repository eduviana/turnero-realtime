"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getAuditsByActionAction } from "../actions/getAuditsByActionAction";
import { AuditsByActionStat } from "../types/audit-stats";

export function AuditsByActionChart() {
  const [data, setData] = useState<AuditsByActionStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuditsByActionAction()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-64 rounded-xl border flex items-center justify-center text-sm text-muted-foreground">
        Cargando estadísticas…
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-64 rounded-xl border flex items-center justify-center text-sm text-muted-foreground">
        No hay auditorías registradas
      </div>
    );
  }

  return (
    <div className="rounded-md border p-4 bg-white space-y-4">
      <div>
        <h3 className="text-lg font-bold">Acciones más frecuentes</h3>
        <p className="text-sm text-slate-500">
          Cantidad de eventos por tipo de acción
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0 }}>
            <XAxis type="number" tickLine={false} />
            <YAxis
              type="category"
              dataKey="action"
              tickLine={false}
              width={150}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`${value ?? 0}`, "Eventos"]}
            />
            <Bar
              dataKey="total"
              fill="#3b82f6" // blue-500
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}