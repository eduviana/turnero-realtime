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
    <div className="rounded-md border pt-4 bg-white">
      <div className="flex flex-col items-center gap-0 mb-8">
        <h3 className="text-lg font-bold text-black dark:text-white">
          Usuarios asignados por servicio
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Cantidad de usuarios actualmente asignados
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-[400px]">
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
                fill: "#94a3b8", // slate-400
                fontSize: 14,
              }}
            />

            <YAxis
              type="category"
              dataKey="serviceName"
              width={180}
              tick={{
                fill: "#94a3b8", // slate-400
                fontSize: 14,
              }}
            />

            <Tooltip formatter={(value) => [`${value}`, "Usuarios"]} />

            <Bar dataKey="usersCount" radius={[0, 4, 4, 0]} fill="#0f172a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
