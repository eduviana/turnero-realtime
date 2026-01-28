"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { AffiliateStatus } from "@/generated/prisma/enums";
import { getAffiliatesByStatusAction } from "../actions/getAffiliatesByStatusAction";

type ChartData = {
  status: AffiliateStatus;
  label: string;
  total: number;
};

const COLORS_BY_STATUS: Record<AffiliateStatus, string> = {
  ACTIVE: "#22c55e",
  SUSPENDED: "#f59e0b",
  INACTIVE: "#64748b",
};

export function AffiliatesByStatusPieChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  const totalAffiliates = data.reduce((acc, d) => acc + d.total, 0);

  useEffect(() => {
    setLoading(true);
    getAffiliatesByStatusAction()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
  <div className="rounded-md border p-4 space-y-4 bg-white">
    {/* Header */}
    <div className="flex flex-col gap-0 mb-4">
      <h3 className="text-lg font-bold text-black dark:text-white">
        Afiliados por estado
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Distribución actual de afiliados
      </p>
    </div>

    <div className="flex gap-6">
      {/* Chart */}
      <div className="h-[250px] w-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={90}
              stroke="#fff"
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={COLORS_BY_STATUS[entry.status]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => {
                if (typeof value !== "number") return ["–", "Afiliados"];
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
      <div className="flex flex-col justify-center gap-3">
        {data.map((item) => {
          const percentage =
            totalAffiliates > 0
              ? ((item.total / totalAffiliates) * 100).toFixed(1)
              : "0";

          return (
            <div
              key={item.status}
              className="flex items-center gap-3 text-sm"
            >
              <span
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: COLORS_BY_STATUS[item.status] }}
              />
              <span className="text-slate-600 dark:text-slate-300">
                {item.label}
              </span>
              <span className="text-slate-400">
                {item.total} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>

    {loading && (
      <p className="text-xs text-muted-foreground">Cargando…</p>
    )}
  </div>
);
}