"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { getSuspendedAffiliatesByReasonAction } from "../actions/getSuspendedAffiliatesByReasonAction";

type ChartData = {
  label: string;
  total: number;
};

const COLORS = [
  "#ef4444", // rojo
  "#f59e0b", // naranja
  "#64748b", // amarillo
  "#3b82f6", // azul
  "#cbd5e1", // slate
];

export function SuspendedAffiliatesByReasonPieChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSuspendedAffiliatesByReasonAction()
      .then((res) =>
        setData(
          res.map((r) => ({
            label: r.label,
            total: r.total,
          })),
        ),
      )
      .finally(() => setLoading(false));
  }, []);


  const totalAffiliates = data.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="rounded-md border p-4 bg-white space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-black dark:text-white">
          Motivos de suspensión
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Distribución de afiliados suspendidos por motivo
        </p>
      </div>

      {/* Chart + Legend */}
      <div className="flex gap-8 items-center">
        {/* Pie */}
        <div className="h-[250px] w-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => {
                  if (typeof value !== "number") {
                    return ["–", "Afiliados"];
                  }

                  const percentage =
                    totalAffiliates > 0
                      ? ((value / totalAffiliates) * 100).toFixed(1)
                      : "0";

                  return [`${value} (${percentage}%)`, "Afiliados"];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <span className="text-slate-600 dark:text-slate-300">
                {item.label}
              </span>
              <span className="text-slate-400">({item.total})</span>
            </div>
          ))}
        </div>
      </div>

      {loading && <p className="text-xs text-muted-foreground">Cargando…</p>}

      {!loading && data.length === 0 && (
        <p className="text-xs text-muted-foreground">
          No hay afiliados suspendidos
        </p>
      )}
    </div>
  );
}
