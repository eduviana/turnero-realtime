// "use client";

// import { useEffect, useState, useTransition } from "react";
// import { Pie, PieChart, PieSectorShapeProps, Sector, Tooltip } from "recharts";

// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// import { getCompletedTicketsByUserAndServiceAction } from "../actions/getCompletedTicketsByUserAndServiceAction";

// type Service = {
//   id: string;
//   name: string;
// };

// type ChartItem = {
//   userId: string;
//   name: string;
//   completedTickets: number;
// };

// type Props = {
//   services: Service[];
// };

// const COLORS = [
//   "#2563eb",
//   "#16a34a",
//   "#f59e0b",
//   "#dc2626",
//   "#7c3aed",
//   "#0891b2",
//   "#9333ea",
//   "#0d9488",
// ];

// /* ---------- Shape custom (colores consistentes) ---------- */
// const MyCustomPie = (props: PieSectorShapeProps) => {
//   return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
// };

// /* ---------- Label externo nativo (leader lines) ---------- */
// const renderOuterLabel = ({
//   name,
//   value,
// }: {
//   name?: string;
//   value?: number;
// }) => {
//   if (!name || value == null) return null;
//   return `${name} (${value})`;
// };

// export function UsersCompletedTicketsByServiceChart({ services }: Props) {
//   const [serviceId, setServiceId] = useState(services[4].id);
//   const [data, setData] = useState<ChartItem[]>([]);
//   const [isPending, startTransition] = useTransition();

//   useEffect(() => {
//     startTransition(async () => {
//       const result = await getCompletedTicketsByUserAndServiceAction(serviceId);

//       setData(
//         result
//           .filter((item) => item.completedTickets > 0)
//           .map((item) => ({
//             userId: item.userId,
//             name:
//               `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim() ||
//               "Sin nombre",
//             completedTickets: item.completedTickets,
//           })),
//       );
//     });
//   }, [serviceId]);

//   return (
//     <div className="rounded-md border p-4 space-y-4 bg-white">
//       {/* Header */}
//       <div className="space-y-3">
//         {/* <h3 className="text-lg font-semibold">
//           Turnos completados por usuario
//         </h3> */}
//         <div className="flex jus gap-0">
//           <div className="flex flex-col ">
//             <h3 className="text-lg font-bold text-black dark:text-white">
//               Turnos completados por usuario
//             </h3>
//             <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
//             cambiar subtitulo
//           </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <Select value={serviceId} onValueChange={setServiceId}>
//             <SelectTrigger className="w-64">
//               <SelectValue placeholder="Seleccionar servicio" />
//             </SelectTrigger>
//             <SelectContent>
//               {services.map((service) => (
//                 <SelectItem key={service.id} value={service.id}>
//                   {service.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {isPending ? (
//         <p className="text-sm text-muted-foreground">Cargando...</p>
//       ) : data.length === 0 ? (
//         <p className="text-sm text-muted-foreground">
//           No hay turnos completados para este servicio
//         </p>
//       ) : (
//         <div className="flex justify-center">
//           <PieChart
//             width={660}
//             height={560}
//             margin={{
//               top: 40,
//               right: 80,
//               bottom: 40,
//               left: 80,
//             }}
//           >
//             <Pie
//               data={data}
//               dataKey="completedTickets"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={160}
//               labelLine
//               label={renderOuterLabel}
//               isAnimationActive
//               shape={MyCustomPie}
//             />

//             <Tooltip
//               formatter={(value, name) => [
//                 typeof value === "number" ? value : Number(value) || 0,
//                 name,
//               ]}
//             />
//           </PieChart>
//         </div>
//       )}
//     </div>
//   );
// }

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

/* ---------- Label externo ---------- */
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
    <div className="rounded-md border px-8 pt-4 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        {/* Title */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-black dark:text-white">
            Turnos completados por usuario
          </h3>
          {/* <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            cambiar subtitulo
          </p> */}
        </div>

        {/* Select */}
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

      {/* Content */}
      {isPending ? (
        <p className="text-sm text-slate-500">Cargando...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-slate-500">
          No hay turnos completados para este servicio
        </p>
      ) : (
        <div className="w-full h-[500px]">
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
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
