// "use client";

// import { Search, Loader2 } from "lucide-react";

// interface MedicationSearchInputProps {
//   onSearch: (query: string) => void;
//   disabled?: boolean;
// }

// export function SearchInput({
//   onSearch,
//   disabled = false,
// }: MedicationSearchInputProps) {
//   return (
//     <div>
//       <label className="block text-sm font-medium mb-1">
//         Buscar medicamento
//       </label>

//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Ej: Paracetamol..."
//           disabled={disabled}
//           className="w-full rounded-md border py-3 pl-4 text-sm outline-none bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//           onChange={(e) => {
//             if (disabled) return;
//             onSearch(e.target.value);
//           }}
//         />

//         {/* Lupa derecha */}
//         <div className="absolute inset-y-0 right-0 flex items-center justify-center rounded-r-md bg-primary px-3">
//           <Search className="h-4 w-4 text-primary-foreground" />
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { Search } from "lucide-react";

interface MedicationSearchInputProps {
  value: string;
  onSearch: (query: string) => void;
  disabled?: boolean;
}

export function SearchInput({
  value,
  onSearch,
  disabled = false,
}: MedicationSearchInputProps) {
  return (
    <div className="">
      <label className="block text-sm font-medium mb-1">
        Buscar medicamento
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          placeholder="Ej: Paracetamol..."
          disabled={disabled}
          className="w-full rounded-md border py-3 pl-4 pr-10 text-sm outline-none bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          onChange={(e) => {
            if (disabled) return;
            onSearch(e.target.value);
          }}
        />

        {/* Lupa derecha */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center rounded-r-md bg-primary px-3">
          <Search className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}