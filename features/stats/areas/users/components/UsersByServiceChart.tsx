"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    serviceId: string;
    serviceName: string;
    usersCount: number;
  }[];
};

export function UsersByServiceChart({ data }: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-xs p-6 space-y-6">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-slate-900">
          Usuarios asignados por servicio
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Cantidad de usuarios actualmente asignados
        </p>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 8,
              right: 24,
              bottom: 8,
              left: 0,
            }}
          >
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="serviceName"
              width={180}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
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
              formatter={(value) => [`${value}`, "Usuarios"]}
            />

            <Bar
              dataKey="usersCount"
              radius={[0, 4, 4, 0]}
              fill="#0f172a"
              maxBarSize={36}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
