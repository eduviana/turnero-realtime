"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Pie,
  PieChart,
  PieSectorShapeProps,
  Sector,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { getCompletedTicketsByUserAndServiceAction } from "../actions/getCompletedTicketsByUserAndServiceAction";

type Service = {
  id: string;
  name: string;
};

type ChartItem = {
  userId: string;
  name: string;
  completedTickets: number;
};

type Props = {
  services: Service[];
};

const COLORS = [
  "#6ea8fe",
  "#f7797c",
  "#80c995",
  "#f8c76a",
  "#b78add",
  "#f9a95e",
  "#67c6e3",
  "#b1cf6b",
];

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

const renderOuterLabel = ({
  name,
  value,
}: {
  name?: string;
  value?: number;
}) => {
  if (!name || value == null) return null;
  return `${name} (${value})`;
};

export function UsersCompletedTicketsByServiceChart({ services }: Props) {
  const [serviceId, setServiceId] = useState(services[4]?.id);
  const [data, setData] = useState<ChartItem[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!serviceId) return;

    startTransition(async () => {
      const result = await getCompletedTicketsByUserAndServiceAction(serviceId);

      setData(
        result
          .filter((item) => item.completedTickets > 0)
          .map((item) => ({
            userId: item.userId,
            name:
              `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim() ||
              "Sin nombre",
            completedTickets: item.completedTickets,
          })),
      );
    });
  }, [serviceId]);

  return (
    <div className="rounded-xl border bg-white shadow-xs p-6 space-y-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-slate-900">
            Turnos completados por usuario
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Distribución por servicio seleccionado
          </p>
        </div>

        <div className="flex justify-center">
          <Select value={serviceId} onValueChange={setServiceId}>
            <SelectTrigger className="w-54">
              <SelectValue placeholder="Seleccionar servicio" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isPending ? (
        <p className="text-sm text-slate-500">Cargando...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-slate-500">
          No hay turnos completados para este servicio
        </p>
      ) : (
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart
              margin={{
                top: 40,
                right: 80,
                bottom: 20,
                left: 80,
              }}
            >
              <Pie
                data={data}
                dataKey="completedTickets"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                labelLine
                label={renderOuterLabel}
                isAnimationActive={false}
                shape={MyCustomPie}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "13px",
                }}
                formatter={(value, name) => [
                  typeof value === "number" ? value : Number(value) || 0,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
