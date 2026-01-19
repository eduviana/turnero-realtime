"use client";

import { Search } from "lucide-react";
import type { KeyboardEvent } from "react";

interface MedicationSearchInputProps {
  value: string;
  onSearch: (query: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function SearchInput({
  value,
  onSearch,
  onKeyDown,
  disabled = false,
}: MedicationSearchInputProps) {
  return (
    <>
      <label
        htmlFor="medication-search"
        className="block mb-2 text-sm font-semibold text-slate-700"
      >
        Buscar medicamento
      </label>

      <div className="relative group">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors ${disabled ? "" : "group-focus-within:text-primary"}`}
        />

        <input
          id="medication-search"
          type="text"
          value={value}
          placeholder="Ej. Ibuprofeno, Paracetamol, Amoxicilina..."
          disabled={disabled}
          onChange={(e) => {
            if (disabled) return;
            onSearch(e.target.value);
          }}
          onKeyDown={onKeyDown}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </>
  );
}