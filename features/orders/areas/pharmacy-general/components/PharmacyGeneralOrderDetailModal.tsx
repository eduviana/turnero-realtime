// "use client";

// import { useEffect, useState } from "react";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import {
//   Receipt,
//   Calendar,
//   User,
//   Stethoscope,
//   Pill,
//   Printer,
//   CheckCircle,
// } from "lucide-react";
// import { PharmacyGeneralOrderDetail } from "../types/pharmacy-general";

// interface Props {
//   orderId: string | null;
//   open: boolean;
//   onClose: () => void;
// }

// export function PharmacyGeneralOrderDetailModal({
//   orderId,
//   open,
//   onClose,
// }: Props) {
//   const [data, setData] = useState<PharmacyGeneralOrderDetail | null>(null);

//   useEffect(() => {
//     if (!orderId || !open) return;

//     const load = async () => {
//       const res = await fetch(`/api/orders/pharmacy-general/${orderId}`);
//       if (!res.ok) {
//         setData(null);
//         return;
//       }
//       const json = await res.json();
//       setData(json);
//     };

//     load();
//   }, [orderId, open]);

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent
//   className="min-w-[800px] max-w-none p-0 overflow-hidden ">
//         {/* ✅ Required for accessibility */}
//         <DialogTitle className="sr-only">
//           Detalle de Orden de Farmacia
//         </DialogTitle>

//         {/* ───────────────── Header ───────────────── */}
//         <div className="flex items-center justify-between px-8 py-6 border-b">
//           <div className="flex items-center gap-3">
//             <div className="bg-primary/10 p-2 rounded-lg">
//               <Receipt className="w-6 h-6 text-primary" />
//             </div>
//             <h2 className="text-2xl font-extrabold tracking-tight">
//               Detalle de Orden
//             </h2>
//           </div>
//         </div>

//         {!data && (
//           <div className="px-8 py-6 text-sm text-muted-foreground">
//             Cargando...
//           </div>
//         )}

//         {data && (
//           <div className="flex flex-col max-h-[80vh] overflow-y-auto">
//             {/* ───────────── Info Card ───────────── */}
//             <div className="px-8 pt-8">
//               <div className="bg-muted/40 rounded-xl p-6 border grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <InfoBlock
//                   label="ID Ticket"
//                   value={data.ticketCode}
//                   highlight
//                 />

//                 <InfoBlock label="Servicio" value={data.service} />

//                 <InfoBlock
//                   label="Fecha y Hora"
//                   value={new Date(data.createdAt).toLocaleString()}
//                   icon={<Calendar className="w-4 h-4" />}
//                 />

//                 {data.affiliate && (
//                   <InfoBlock
//                     label="Afiliado"
//                     value={data.affiliate}
//                     icon={<User className="w-4 h-4" />}
//                     span={2}
//                   />
//                 )}

//                 <InfoBlock
//                   label="Operador"
//                   value={data.operator}
//                   icon={<Stethoscope className="w-4 h-4" />}
//                 />
//               </div>
//             </div>

//             {/* ───────────── Productos ───────────── */}
//             <div className="px-8 py-8">
//               <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
//                 <Pill className="w-5 h-5 text-primary" />
//                 Listado de Productos
//               </h3>

//               <div className="border rounded-xl overflow-hidden">
//                 <table className="w-full text-sm">
//                   <thead className="bg-muted/50 border-b">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-bold uppercase">
//                         Producto
//                       </th>
//                       <th className="px-6 py-4 text-center text-xs font-bold uppercase">
//                         Cantidad
//                       </th>
//                       <th className="px-6 py-4 text-right text-xs font-bold uppercase">
//                         P. Unitario
//                       </th>
//                       <th className="px-6 py-4 text-right text-xs font-bold uppercase">
//                         Total
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y">
//                     {data.items.map((item) => (
//                       <tr
//                         key={item.id}
//                         className="hover:bg-muted/30 transition-colors"
//                       >
//                         <td className="px-6 py-5">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
//                               💊
//                             </div>
//                             <p className="font-bold">{item.productName}</p>
//                           </div>
//                         </td>

//                         <td className="px-6 py-5 text-center">
//                           <span className="inline-flex items-center justify-center bg-muted px-3 py-1 rounded-lg font-bold">
//                             {item.quantity}
//                           </span>
//                         </td>

//                         <td className="px-6 py-5 text-right font-medium text-muted-foreground">
//                           cambiar
//                         </td>

//                         <td className="px-6 py-5 text-right font-bold">
//                           cambiar
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* ───────────── Footer ───────────── */}
//             <div className="px-8 py-6 border-t bg-muted/30 flex flex-wrap items-center justify-between gap-4">
//               <div className="flex items-center gap-6">
//                 <div className="bg-primary/10 border border-primary/20 rounded-xl px-5 py-3 flex flex-col items-center">
//                   <span className="text-[10px] uppercase font-extrabold text-primary tracking-widest">
//                     Total Ítems
//                   </span>
//                   <span className="text-2xl font-black text-primary leading-none">
//                     {data.totalItems}
//                   </span>
//                 </div>

//                 <div className="flex flex-col">
//                   <span className="text-sm text-muted-foreground">
//                     Total a Pagar
//                   </span>
//                   <span className="text-2xl font-black tracking-tight">
//                     cambiar
//                   </span>
//                 </div>
//               </div>

//               <div className="flex gap-3 ml-auto">
//                 <button
//                   type="button"
//                   className="flex items-center gap-2 px-6 py-3 rounded-lg border font-bold text-sm hover:bg-muted transition"
//                 >
//                   <Printer className="w-4 h-4" />
//                   Imprimir
//                 </button>

//                 <button
//                   type="button"
//                   className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition"
//                 >
//                   <CheckCircle className="w-4 h-4" />
//                   Finalizar
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

// /* ─────────────────────────────── */

// function InfoBlock({
//   label,
//   value,
//   icon,
//   highlight,
//   span = 1,
// }: {
//   label: string;
//   value: string;
//   icon?: React.ReactNode;
//   highlight?: boolean;
//   span?: number;
// }) {
//   return (
//     <div className={`flex flex-col gap-1 ${span === 2 ? "md:col-span-2" : ""}`}>
//       <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
//         {label}
//       </span>
//       <div
//         className={`flex items-center gap-2 ${
//           highlight ? "text-primary font-bold text-lg" : "font-semibold"
//         }`}
//       >
//         {icon}
//         {value}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Receipt,
  Calendar,
  User,
  Stethoscope,
  Pill,
  Printer,
  CheckCircle,
} from "lucide-react";
import { PharmacyGeneralOrderDetail } from "../types/pharmacy-general";
import { formatCurrency } from "@/lib/formatCurrency";

interface Props {
  orderId: string | null;
  open: boolean;
  onClose: () => void;
}

export function PharmacyGeneralOrderDetailModal({
  orderId,
  open,
  onClose,
}: Props) {
  const [data, setData] = useState<PharmacyGeneralOrderDetail | null>(null);

  useEffect(() => {
    if (!orderId || !open) return;

    const load = async () => {
      const res = await fetch(`/api/orders/pharmacy-general/${orderId}`);
      if (!res.ok) {
        setData(null);
        return;
      }
      const json = await res.json();
      setData(json);
    };

    load();
  }, [orderId, open]);

  console.log(data, "SLKJALKDKLLKJASDJLJLKSAJDLKJSAKLDJLKASJLKDJ");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-[1000px] max-w-none p-0 overflow-hidden">
        {/* Accesibilidad */}
        <DialogTitle className="sr-only">
          Detalle de Orden de Farmacia
        </DialogTitle>

        {/* ───────────── Header ───────────── */}
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Receipt className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Detalle de Orden
            </h2>
          </div>
        </div>

        {!data && (
          <div className="px-8 py-6 text-sm text-muted-foreground">
            Cargando...
          </div>
        )}

        {data && (
          <div className="flex flex-col max-h-[80vh] overflow-y-auto">
            {/* ───────────── Info Card ───────────── */}
            <div className="px-8 pt-8">
              <div className="bg-muted/40 rounded-xl p-6 border grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <InfoBlock label="ID Ticket" value={data.id} highlight />

                <InfoBlock label="Servicio" value={data.service} />

                <InfoBlock
                  label="Fecha y Hora"
                  value={new Date(data.createdAt).toLocaleString()}
                  icon={<Calendar className="w-4 h-4" />}
                />

                {data.affiliate && (
                  <>
                    <InfoBlock
                      label="Afiliado"
                      value={data.affiliate.fullName}
                      icon={<User className="w-4 h-4" />}
                      span={1}
                    />

                    <InfoBlock
                      label="DNI Afiliado"
                      value={data.affiliate.dni}
                      span={1}
                    />
                  </>
                )}

                <InfoBlock
                  label="Operador"
                  value={data.operator}
                  icon={<Stethoscope className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* ───────────── Productos ───────────── */}
            <div className="px-8 py-8">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Pill className="w-5 h-5 text-primary" />
                Listado de Productos
              </h3>

              <div className="border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                        Producto
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold uppercase">
                        Cantidad
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold uppercase">
                        P. Unitario
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {data.items.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                              💊
                            </div>
                            <p className="font-bold">{item.productName}</p>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-center">
                          <span className="inline-flex items-center justify-center bg-muted px-3 py-1 rounded-lg font-bold">
                            {item.quantity}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-right font-medium text-muted-foreground">
                          {formatCurrency(item.unitPrice)}
                        </td>

                        <td className="px-6 py-5 text-right font-bold">
                          {formatCurrency(item.totalPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ───────────── Footer ───────────── */}
            <div className="px-8 py-6 border-t bg-muted/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="bg-primary/10 border border-primary/20 rounded-xl px-5 py-3 flex flex-col items-center">
                  <span className="text-[10px] uppercase font-extrabold text-primary tracking-widest">
                    Total Ítems
                  </span>
                  <span className="text-2xl font-black text-primary leading-none">
                    {data.totalItems}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Total a Pagar
                  </span>
                  <span className="text-2xl font-black tracking-tight">
                    {formatCurrency(data.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 ml-auto">
                <button
                  type="button"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border font-bold text-sm hover:bg-muted transition"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition"
                >
                  <CheckCircle className="w-4 h-4" />
                  Finalizar
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ───────────── InfoBlock ───────────── */

function InfoBlock({
  label,
  value,
  icon,
  highlight,
  span = 1,
  align = "start",
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  span?: number;
  align?: "start" | "center";
}) {
  return (
    <div
      className={`
        flex flex-col gap-1
        ${span === 2 ? "md:col-span-2" : ""}
        ${align === "center" ? "items-center text-center" : ""}
      `}
    >
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div
        className={`flex items-center gap-2 ${
          highlight ? "text-primary font-bold text-lg" : "font-semibold"
        }`}
      >
        {icon}
        {value}
      </div>
    </div>
  );
}
