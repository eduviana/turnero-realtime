"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getAvgServiceAttentionTimeAction } from "../actions/getAvgServiceAttentionTimeAction";

type DataItem = {
  service: string;
  avgMinutes: number;
};

export function AvgServiceAttentionTimeChart() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvgServiceAttentionTimeAction().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="rounded-md border p-4 space-y-4 bg-white">
      {/* Header */}
      <div className="flex flex-col gap-0 mb-8">
        <h3 className="text-lg font-bold text-black dark:text-white">
          Tiempo promedio de atención
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Promedio en minutos por servicio (turnos completados)
        </p>
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
            <Tooltip formatter={(value) => [`${value} min`, "Promedio"]} />
            <Bar dataKey="avgMinutes" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {loading && <p className="text-xs text-muted-foreground">Cargando…</p>}
    </div>
  );
}
