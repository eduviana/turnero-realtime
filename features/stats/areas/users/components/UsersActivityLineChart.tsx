"use client";

import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useState } from "react";

type Granularity = "day" | "week" | "month";

type DataPoint = {
  date: string;
  activeUsers: number;
};

type Props = {
  initialData: DataPoint[];
  onGranularityChange: (g: Granularity) => Promise<DataPoint[]>;
};

function formatXAxis(value: string, granularity: Granularity) {
  if (granularity === "day") {
    return value.slice(8, 10) + "/" + value.slice(5, 7);
  }

  if (granularity === "week") {
    return value.slice(5, 10);
  }

  return value.slice(5);
}

export default function UsersActivityLineChart({
  initialData,
  onGranularityChange,
}: Props) {
  const [granularity, setGranularity] = useState<Granularity>("day");
  const [data, setData] = useState(initialData);

  async function handleChange(g: Granularity) {
    setGranularity(g);
    setData(await onGranularityChange(g));
  }

  return (
    <div className="rounded-xl border bg-white shadow-xs p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0">
          <h3 className="text-lg font-bold text-slate-900">
            Usuarios activos en el tiempo
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Evolución del flujo de usuarios por período seleccionado
          </p>
        </div>

        <div className="flex gap-2">
          {(["day", "week", "month"] as Granularity[]).map((g) => (
            <button
              key={g}
              onClick={() => handleChange(g)}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                granularity === g
                  ? "bg-[#1e293b] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {g === "day" ? "Día" : g === "week" ? "Semana" : "Mes"}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
        >
          <defs>
            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

          <XAxis
            dataKey="date"
            tickFormatter={(value) => formatXAxis(value, granularity)}
            interval="preserveStartEnd"
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "13px",
            }}
            labelFormatter={(value) =>
              granularity === "month" ? `Mes ${value}` : `Fecha ${value}`
            }
          />

          <Area
            type="monotone"
            dataKey="activeUsers"
            fill="url(#usersGradient)"
            stroke="none"
          />

          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#2563eb" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
