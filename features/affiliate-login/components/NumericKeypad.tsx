"use client";

import { Button } from "@/components/ui/button";

interface NumericKeypadProps {
  value: string;
  onChange: (newValue: string) => void;
  onSubmit?: () => void;
}

export function NumericKeypad({
  value,
  onChange,
  onSubmit,
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

  // Estilos base compartidos
  const base =
    "h-24 text-3xl transition-all duration-150 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500";

  return (
    <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto select-none">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <Button
          key={n}
          type="button"
          variant="secondary"
          className={`${base} hover:bg-gray-200`}
          onClick={() => handleDigit(String(n))}
        >
          {n}
        </Button>
      ))}

      {/* Borrar Todo */}
      <Button
        type="button"
        variant="destructive"
        className={`${base} text-2xl hover:bg-red-600`}
        onClick={handleClear}
      >
        Borrar Todo
      </Button>

      {/* 0 */}
      <Button
        type="button"
        variant="secondary"
        className={`${base} hover:bg-gray-200`}
        onClick={() => handleDigit("0")}
      >
        0
      </Button>

      {/* Borrar un dígito */}
      <Button
        type="button"
        variant="outline"
        className={`${base} text-2xl hover:bg-gray-100 hover:border-gray-400`}
        onClick={handleBackspace}
      >
        Borrar
      </Button>
    </div>
  );
}
