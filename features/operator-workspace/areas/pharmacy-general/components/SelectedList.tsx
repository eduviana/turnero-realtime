"use client";

import { SelectedGeneralProduct } from "../types/pharmacy-general";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, Package, Trash2, Minus, Plus } from "lucide-react";

interface Props {
  items: SelectedGeneralProduct[];
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
    <section className="min-h-[500px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="flex items-center gap-2 font-semibold text-slate-800">
          <ShoppingBasket className="h-4 w-4 text-primary" />
          Productos seleccionados
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
            No hay productos agregados
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
                    ${
                      index % 2 === 0
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-amber-100 text-amber-600"
                    }
                  `}
                >
                  <Package className="h-5 w-5" />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-800">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Producto de farmacia general
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