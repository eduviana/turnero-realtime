// "use client";

// interface MedicationSearchInputProps {
//   onSearch: (query: string) => void;
// }

// export function SearchInput({
//   onSearch,
// }: MedicationSearchInputProps) {
//   return (
//     <div className="mt-4">
//       <label className="block text-sm font-medium mb-1">
//         Buscar medicamento
//       </label>

//       <input
//         type="text"
//         placeholder="Ej: Amoxicilina, Paracetamol..."
//         className="w-full rounded-md border px-3 py-2 text-sm"
//         onChange={(e) => {
//           const value = e.target.value;
//           console.log(
//             "[MedicationSearchInput] search change:",
//             value
//           );
//           onSearch(value);
//         }}
//       />
//     </div>
//   );
// }


"use client";

interface MedicationSearchInputProps {
  onSearch: (query: string) => void;
  disabled?: boolean;
}

export function SearchInput({
  onSearch,
  disabled = false,
}: MedicationSearchInputProps) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-1">
        Buscar medicamento
      </label>

      <input
        type="text"
        placeholder="Ej: Amoxicilina, Paracetamol..."
        className="w-full rounded-md border px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
        onChange={(e) => {
          if (disabled) return;

          const value = e.target.value;
          onSearch(value);
        }}
      />
    </div>
  );
}