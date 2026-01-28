"use client";

import {
  LineChart,
  Line,
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
    // YYYY-MM-DD → DD/MM
    return value.slice(8, 10) + "/" + value.slice(5, 7);
  }

  if (granularity === "week") {
    // mostrar inicio de semana
    return value.slice(5, 10);
  }

  // month → YYYY-MM
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
    <div className="rounded-md border p-4 space-y-4 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0">
          <h3 className="text-lg font-bold text-black dark:text-white">
            Usuarios activos en el tiempo
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Evolución del flujo de usuarios por período seleccionado
          </p>
        </div>

        <div className="flex gap-2">
          {(["day", "week", "month"] as Granularity[]).map((g) => (
            <button
              key={g}
              onClick={() => handleChange(g)}
              className={`px-3 py-1 text-sm rounded ${
                granularity === g
                  ? "bg-slate-700 text-primary-foreground"
                  : "border"
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
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            tickFormatter={(value) => formatXAxis(value, granularity)}
            interval="preserveStartEnd"
          />

          <YAxis allowDecimals={false} />

          <Tooltip
            labelFormatter={(value) =>
              granularity === "month" ? `Mes ${value}` : `Fecha ${value}`
            }
          />

          <Line
            type="monotone"
            dataKey="activeUsers"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
