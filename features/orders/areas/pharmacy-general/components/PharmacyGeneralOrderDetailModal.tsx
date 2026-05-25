"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X, Receipt, Calendar, User, Stethoscope, Pill, Printer, CheckCircle } from "lucide-react";
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="min-w-[1000px] max-w-none gap-0 p-0 overflow-hidden rounded-lg border-0 bg-foreground shadow-2xl outline outline-1 outline-slate-900"
      >
        <DialogTitle className="sr-only">
          Detalle de Orden de Farmacia
        </DialogTitle>

        {/* Header */}
        <div className="relative flex items-center justify-between bg-foreground px-8 py-6">
          <div className="flex items-center gap-3">
            <Receipt className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold text-white">
              Detalle de Orden
            </h2>
          </div>

          <DialogClose className="cursor-pointer text-white opacity-100 transition-opacity hover:opacity-70">
            <X className="size-5" />
          </DialogClose>
        </div>

        {/* Body */}
        <div className="bg-white">
          {!data && (
            <div className="px-8 py-6 text-sm text-gray-500">
              Cargando...
            </div>
          )}

          {data && (
            <div className="flex flex-col max-h-[80vh] overflow-y-auto">
              {/* Info Card */}
              <div className="px-8 pt-6">
                <div className="rounded-xl bg-gray-50 border border-gray-200/70 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
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
                      />

                      <InfoBlock
                        label="DNI Afiliado"
                        value={data.affiliate.dni}
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

              {/* Productos */}
              <div className="px-8 py-6">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-gray-900">
                  <Pill className="w-5 h-5" />
                  Listado de Productos
                </h3>

                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-[#1e293b]">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-white">
                          Producto
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-bold uppercase text-white">
                          Cantidad
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-bold uppercase text-white">
                          P. Unitario
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-bold uppercase text-white">
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {data.items.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="font-bold text-gray-800">
                              {item.productName}
                            </p>
                          </td>

                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-3 py-1 rounded font-bold text-xs">
                              {item.quantity}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-right text-sm text-gray-500">
                            {formatCurrency(item.unitPrice)}
                          </td>

                          <td className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                            {formatCurrency(item.totalPrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-5 border-t border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="bg-[#1e293b] rounded-lg px-5 py-3 flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                      Total Ítems
                    </span>
                    <span className="text-2xl font-black text-white leading-none">
                      {data.totalItems}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      Total a Pagar
                    </span>
                    <span className="text-2xl font-black tracking-tight text-gray-900">
                      {formatCurrency(data.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 ml-auto">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-6 py-3 rounded border border-gray-300 font-bold text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Printer className="w-4 h-4" />
                    Imprimir
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-2 px-8 py-3 rounded bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Finalizar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
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
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <div
        className={`flex items-center gap-2 ${
          highlight ? "text-[#1e293b] font-bold text-lg" : "font-semibold text-gray-700"
        }`}
      >
        {icon}
        {value}
      </div>
    </div>
  );
}
