"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { getAuditsByEventTypeAction } from "../actions/getAuditsByEventTypeAction";
import { AuditsByEventTypeStat } from "../types/audit-stats";

/**
 * Colores oficiales por tipo de auditoría
 */
const EVENT_TYPE_COLORS: Record<
  AuditsByEventTypeStat["eventType"],
  string
> = {
  SECURITY: "#dc2626",   // red-600
  SYSTEM: "#2563eb",     // blue-600
  FUNCTIONAL: "#059669", // emerald-600
};

export function AuditsByEventTypeChart() {
  const [data, setData] = useState<AuditsByEventTypeStat[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAuditsByEventTypeAction()
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, []);

  const totalEvents = data.reduce(
    (acc, item) => acc + item.total,
    0,
  );

  return (
    <div className="rounded-md border p-4 bg-white space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-black">
          Auditorías por tipo
        </h3>
        <p className="text-sm text-slate-500">
          Distribución de eventos registrados
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
                nameKey="eventType"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.eventType}
                    fill={EVENT_TYPE_COLORS[entry.eventType]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => {
                  if (typeof value !== "number") {
                    return ["–", "Eventos"];
                  }

                  const percentage =
                    totalEvents > 0
                      ? ((value / totalEvents) * 100).toFixed(1)
                      : "0";

                  return [`${value} (${percentage}%)`, "Eventos"];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {data.map((item) => (
            <div
              key={item.eventType}
              className="flex items-center gap-2 text-sm"
            >
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{
                  backgroundColor:
                    EVENT_TYPE_COLORS[item.eventType],
                }}
              />
              <span className="text-slate-600">
                {item.eventType}
              </span>
              <span className="text-slate-400">
                ({item.total})
              </span>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <p className="text-xs text-muted-foreground">
          Cargando…
        </p>
      )}

      {!loading && data.length === 0 && (
        <p className="text-xs text-muted-foreground">
          No hay eventos de auditoría
        </p>
      )}
    </div>
  );
}