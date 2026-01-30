"use client";

import { Search } from "lucide-react";
import type { KeyboardEvent } from "react";

interface PharmacyGeneralSearchInputProps {
  value: string;
  onSearch: (query: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  helperText?: string;
}

export function SearchInput({
  value,
  onSearch,
  onKeyDown,
  disabled = false,
  helperText,
}: PharmacyGeneralSearchInputProps) {
  return (
    <div>
      <label
        htmlFor="pharmacy-general-search"
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        Buscar producto
      </label>

      <div className="relative group">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors ${
            disabled ? "" : "group-focus-within:text-primary"
          }`}
        />

        <input
          id="pharmacy-general-search"
          type="text"
          value={value}
          placeholder="Ej. Alcohol, Gasas, Termómetro..."
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={(e) => {
            if (disabled) return;
            onSearch(e.target.value);
          }}
          onKeyDown={onKeyDown}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {helperText && (
        <p className="mt-2 text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}