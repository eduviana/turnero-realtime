"use client";

import { Trash2, Delete } from "lucide-react";

interface NumericKeypadProps {
  value: string;
  onChange: (newValue: string) => void;
  onSubmit?: () => void;
}

export function NumericKeypad({
  value,
  onChange,
}: NumericKeypadProps) {
  const handleDigit = (digit: string) => {
    if (value.length >= 9) return;
    onChange(value + digit);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange("");
  };

  const keyBase =
    "h-16 rounded-lg flex items-center justify-center text-xl font-semibold transition-all duration-200 active:scale-95";

  return (
    <div className="grid grid-cols-3 gap-3 select-none">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <button
          key={n}
          type="button"
          className={`${keyBase} bg-muted border border-border/20 text-foreground hover:bg-accent`}
          onClick={() => handleDigit(String(n))}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        className={`${keyBase} bg-destructive text-white flex flex-col gap-0.5 text-xs font-bold hover:brightness-110`}
        onClick={handleClear}
      >
        <Trash2 className="w-4 h-4" />
        BORRAR TODO
      </button>

      <button
        type="button"
        className={`${keyBase} bg-muted border border-border/20 text-foreground hover:bg-accent`}
        onClick={() => handleDigit("0")}
      >
        0
      </button>

      <button
        type="button"
        className={`${keyBase} bg-accent border border-border/20 text-foreground flex flex-col gap-0.5 text-xs font-bold hover:bg-muted`}
        onClick={handleBackspace}
      >
        <Delete className="w-4 h-4" />
        BORRAR
      </button>
    </div>
  );
}
