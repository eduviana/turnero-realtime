// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// type Props = {
//   data: {
//     serviceName: string;
//     completedTickets: number;
//   }[];
// };

// export function CompletedTicketsByServiceChart({ data }: Props) {
//   return (
//     <div className="rounded-md border bg-white p-4 space-y-4">
//       <div className="flex flex-col p-4">
//         <h3 className="text-lg font-bold text-slate-900">
//           Tickets completados por servicio
//         </h3>
//         <p className="mt-1 text-sm text-slate-500">
//           Volumen total de tickets finalizados
//         </p>
//       </div>

//       <ResponsiveContainer width="100%" height={320}>
//         <BarChart
//           data={data}
//           layout="vertical"
//           margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
//         >
//           <XAxis
//             type="number"
//             allowDecimals={false}
//             tick={{ fill: "#94a3b8", fontSize: 14 }}
//           />
//           <YAxis
//             type="category"
//             dataKey="serviceName"
//             width={180}
//             tick={{ fill: "#94a3b8", fontSize: 14 }}
//           />
//           <Tooltip />
//           <Bar dataKey="completedTickets" fill="#0f172a" radius={[0, 4, 4, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
