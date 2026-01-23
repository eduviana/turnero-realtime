"use client";

import { useEffect, useState, useTransition } from "react";
import { Pie, PieChart, PieSectorShapeProps, Sector, Tooltip } from "recharts";

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
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#9333ea",
  "#0d9488",
];

/* ---------- Shape custom (colores consistentes) ---------- */
const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

/* ---------- Label externo nativo (leader lines) ---------- */
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
  const [serviceId, setServiceId] = useState(services[0].id);
  const [data, setData] = useState<ChartItem[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">
          Turnos completados por usuario
        </h3>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Servicio</span>

          <Select value={serviceId} onValueChange={setServiceId}>
            <SelectTrigger className="w-64">
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
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No hay turnos completados para este servicio
        </p>
      ) : (
        <div className="flex justify-center">
          <PieChart
            width={660}
            height={560}
            margin={{
              top: 40,
              right: 80,
              bottom: 40,
              left: 80,
            }}
          >
            <Pie
              data={data}
              dataKey="completedTickets"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={160}
              labelLine
              label={renderOuterLabel}
              isAnimationActive
              shape={MyCustomPie}
            />

            <Tooltip
              formatter={(value, name) => [
                typeof value === "number" ? value : Number(value) || 0,
                name,
              ]}
            />
          </PieChart>
        </div>
      )}
    </div>
  );
}
