// "use client";

// import { SelectedMedication } from "../types/pharmacy-medications";
// import { Button } from "@/components/ui/button";

// interface Props {
//   items: SelectedMedication[];
//   onIncrease: (productId: string) => void;
//   onDecrease: (productId: string) => void;
//   disabled?: boolean;
// }

// export function SelectedList({
//   items,
//   onIncrease,
//   onDecrease,
//   disabled = false,
// }: Props) {
//   if (items.length === 0) {
//     return (
//       <p className="mt-6 text-sm text-muted-foreground">
//         No hay medicamentos agregados
//       </p>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-2 text-sm font-medium">Medicamentos agregados</h2>

//       <ul className="space-y-2">
//         {items.map((item) => (
//           <li
//             key={item.productId}
//             className={`flex items-center justify-between rounded-md border bg-white px-3 py-2 ${
//               disabled ? "opacity-50" : ""
//             }`}
//           >
//             <span className="text-sm">{item.name}</span>

//             <div className="flex items-center gap-2">
//               <Button
//                 type="button"
//                 size="icon"
//                 disabled={disabled}
//                 onClick={() => {
//                   if (disabled) return;
//                   onDecrease(item.productId);
//                 }}
//                 className="h-8 w-8 bg-slate-700"
//               >
//                 −
//               </Button>

//               <span className="w-6 text-center text-sm">{item.quantity}</span>

//               <Button
//                 type="button"
//                 size="icon"
//                 disabled={disabled}
//                 onClick={() => {
//                   if (disabled) return;
//                   onIncrease(item.productId);
//                 }}
//                 className="h-8 w-8 bg-slate-700"
//               >
//                 +
//               </Button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


"use client";

import { SelectedMedication } from "../types/pharmacy-medications";
import { Button } from "@/components/ui/button";
import {
  ShoppingBasket,
  Pill,
  Trash2,
  Minus,
  Plus,
} from "lucide-react";

interface Props {
  items: SelectedMedication[];
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  disabled?: boolean;
}

export function SelectedList({
  items,
  onIncrease,
  onDecrease,
  disabled = false,
}: Props) {
  const isEmpty = items.length === 0;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="flex items-center gap-2 font-semibold text-slate-800">
          <ShoppingBasket className="h-4 w-4 text-primary" />
          Medicamentos seleccionados
        </h2>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {items.length} producto{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Body */}
      {isEmpty ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-10 text-center">
          <ShoppingBasket className="h-6 w-6 text-slate-300" />
          <p className="text-sm text-slate-500">
            No hay medicamentos agregados
          </p>
        </div>
      ) : (
        /* Lista */
        <ul className="space-y-3 p-4">
          {items.map((item, index) => (
            <li
              key={item.productId}
              className={`
                group flex items-center justify-between
                rounded-xl border border-slate-100
                bg-slate-50 px-4 py-3
                transition-colors hover:bg-slate-100
                ${disabled ? "opacity-50" : ""}
              `}
            >
              {/* Info izquierda */}
              <div className="flex items-center gap-4">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center
                    rounded-lg
                    ${index % 2 === 0
                      ? "bg-blue-100 text-blue-600"
                      : "bg-purple-100 text-purple-600"}
                  `}
                >
                  <Pill className="h-5 w-5" />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-800">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Medicamento seleccionado
                  </p>
                </div>
              </div>

              {/* Acciones derecha */}
              <div className="flex items-center gap-4">
                {/* Cantidad */}
                <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onClick={() => {
                      if (!disabled) onDecrease(item.productId);
                    }}
                    className="h-8 w-8 text-slate-500 hover:bg-slate-100"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center text-sm font-medium text-slate-700">
                    {item.quantity}
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onClick={() => {
                      if (!disabled) onIncrease(item.productId);
                    }}
                    className="h-8 w-8 text-slate-500 hover:bg-slate-100"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Eliminar */}
                <button
                  type="button"
                  disabled={disabled}
                  className="p-2 text-slate-400 transition-colors hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}