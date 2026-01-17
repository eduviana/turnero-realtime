// "use client";

// import { PharmacyMedicationSearchResult } from "../hooks/usePharmacyMedicationSearch";

// interface Props {
//   results: PharmacyMedicationSearchResult[];
//   onSelect: (product: PharmacyMedicationSearchResult) => void;
//   isSearching: boolean;
// }

// export function SearchResults({
//   results,
//   onSelect,
//   isSearching,
// }: Props) {
//   if (isSearching) {
//     return (
//       <div className="mt-2 text-sm text-muted-foreground">
//         Buscando...
//       </div>
//     );
//   }

//   if (results.length === 0) {
//     return null;
//   }

//   return (
//     <ul className="mt-2 rounded-md border bg-white shadow-sm">
//       {results.map((product) => (
//         <li
//           key={product.id}
//           className="flex items-center justify-between px-3 py-2 hover:bg-muted"
//         >
//           <span className="text-sm">
//             {product.name}
//           </span>

//           <button
//             type="button"
//             onClick={() => onSelect(product)}
//             className="text-sm font-medium text-primary hover:underline"
//           >
//             Agregar
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }

"use client";

import { PharmacyMedicationSearchResult } from "../hooks/usePharmacyMedicationSearch";

interface Props {
  results: PharmacyMedicationSearchResult[];
  onSelect: (product: PharmacyMedicationSearchResult) => void;
  isSearching: boolean;
  disabled?: boolean;
}

export function SearchResults({
  results,
  onSelect,
  isSearching,
  disabled = false,
}: Props) {
  if (isSearching) {
    return (
      <div className="mt-2 text-sm text-muted-foreground">Buscando...</div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <ul className="mt-2 rounded-md border bg-white shadow-sm">
      {results.map((product) => (
        <li
          key={product.id}
          className={`flex items-center justify-between px-3 py-2 ${
            disabled ? "opacity-50" : "hover:bg-muted"
          }`}
        >
          <span className="text-sm">{product.name}</span>

          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              onSelect(product);
            }}
            className="text-sm font-medium text-primary hover:underline disabled:cursor-not-allowed"
          >
            Agregar
          </button>
        </li>
      ))}
    </ul>
  );
}
