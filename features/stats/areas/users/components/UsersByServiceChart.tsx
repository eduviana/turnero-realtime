"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
    <div className="rounded-md border p-4 space-y-4">
      <div>
        <h3 className="text-sm font-medium">Usuarios activos por servicio</h3>
        <p className="text-sm text-muted-foreground">
          Cantidad de usuarios actualmente asignados
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 24, bottom: 8, left: 80 }}
        >
          <XAxis type="number" allowDecimals={false} />

          <YAxis type="category" dataKey="serviceName" width={120} />

          <Tooltip formatter={(value) => [`${value}`, "Usuarios"]} />

          <Bar dataKey="usersCount" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
