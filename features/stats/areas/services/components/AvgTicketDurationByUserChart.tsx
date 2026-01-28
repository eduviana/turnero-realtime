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

import { getAvgTicketDurationByUserAndServiceAction } from "../actions/getAvgTicketDurationByUserAndServiceAction";
import { getServicesAction } from "../actions/getServicesAction";

type ChartData = {
  userId: string;
  userName: string;
  avgMinutes: number;
};

type ServiceOption = {
  id: string;
  name: string;
};

export function AvgTicketDurationByUserChart() {
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar servicios
  useEffect(() => {
    getServicesAction().then((res) => {
      setServices(res);
      if (res.length > 0) {
        setServiceId(res[0].id);
      }
    });
  }, []);

  // Cargar data del gráfico
  useEffect(() => {
    if (!serviceId) return;

    setLoading(true);
    getAvgTicketDurationByUserAndServiceAction(serviceId)
      .then(setData)
      .finally(() => setLoading(false));
  }, [serviceId]);

  return (
    <div className="rounded-md border p-4 space-y-4 bg-white">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex flex-col gap-0">
          <h3 className="text-lg font-bold text-black dark:text-white">
            Duración promedio de atención por usuario
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Promedio en minutos por turno completado
          </p>
        </div>

        <select
          value={serviceId ?? ""}
          onChange={(e) => setServiceId(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm bg-white"
        >
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
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
              dataKey="userName"
              type="category"
              width={180}
              tick={{
                fill: "#94a3b8", // slate-400
                fontSize: 14,
              }}
            />
            <Tooltip
              formatter={(value) => {
                if (typeof value !== "number") return ["–", "Promedio"];
                return [`${value} min`, "Promedio"];
              }}
            />
            <Bar dataKey="avgMinutes" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {loading && <p className="text-xs text-muted-foreground">Cargando…</p>}

      {!loading && data.length === 0 && (
        <p className="text-xs text-muted-foreground">
          No hay datos para este servicio
        </p>
      )}
    </div>
  );
}
