// "use client";

// import { SelectedMedication } from "../types/pharmacy-medications";

// interface Props {
//   items: SelectedMedication[];
//   onIncrease: (productId: string) => void;
//   onDecrease: (productId: string) => void;
// }

// export function SelectedList({
//   items,
//   onIncrease,
//   onDecrease,
// }: Props) {
//   if (items.length === 0) {
//     return (
//       <p className="mt-6 text-sm text-muted-foreground">
//         No hay medicamentos agregados
//       </p>
//     );
//   }

//   return (
//     <div className="mt-6">
//       <h2 className="text-sm font-medium mb-2">
//         Medicamentos seleccionados
//       </h2>

//       <ul className="space-y-2">
//         {items.map((item) => (
//           <li
//             key={item.productId}
//             className="flex items-center justify-between rounded-md border px-3 py-2"
//           >
//             <span className="text-sm">{item.name}</span>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => onDecrease(item.productId)}
//                 className="px-2 py-1 border rounded"
//               >
//                 −
//               </button>

//               <span className="text-sm w-6 text-center">
//                 {item.quantity}
//               </span>

//               <button
//                 onClick={() => onIncrease(item.productId)}
//                 className="px-2 py-1 border rounded"
//               >
//                 +
//               </button>
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
  if (items.length === 0) {
    return (
      <p className="mt-6 text-sm text-muted-foreground">
        No hay medicamentos agregados
      </p>
    );
  }

  return (
    <div>
      <h2 className="mb-2 text-sm font-medium">Medicamentos agregados</h2>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.productId}
            className={`flex items-center justify-between rounded-md border bg-white px-3 py-2 ${
              disabled ? "opacity-50" : ""
            }`}
          >
            <span className="text-sm">{item.name}</span>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;
                  onDecrease(item.productId);
                }}
                className="h-8 w-8 bg-slate-700"
              >
                −
              </Button>

              <span className="w-6 text-center text-sm">{item.quantity}</span>

              <Button
                type="button"
                size="icon"
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;
                  onIncrease(item.productId);
                }}
                className="h-8 w-8 bg-slate-700"
              >
                +
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
