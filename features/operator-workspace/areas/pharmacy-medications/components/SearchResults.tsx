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

// "use client";

// import { PharmacyMedicationSearchResult } from "../hooks/usePharmacyMedicationSearch";

// interface Props {
//   results: PharmacyMedicationSearchResult[];
//   onSelect: (product: PharmacyMedicationSearchResult) => void;
//   isSearching: boolean;
//   disabled?: boolean;
// }

// export function SearchResults({
//   results,
//   onSelect,
//   isSearching,
//   disabled = false,
// }: Props) {
//   if (isSearching) {
//     return (
//       <div className="mt-2 text-sm text-muted-foreground">Buscando...</div>
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
//           className={`flex items-center justify-between px-3 py-2 ${
//             disabled ? "opacity-50" : "hover:bg-muted"
//           }`}
//         >
//           <span className="text-sm">{product.name}</span>

//           <button
//             type="button"
//             disabled={disabled}
//             onClick={() => {
//               if (disabled) return;
//               onSelect(product);
//             }}
//             className="text-sm font-medium text-primary hover:underline disabled:cursor-not-allowed"
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
  query: string;
}

export function SearchResults({
  results,
  onSelect,
  isSearching,
  disabled = false,
  query,
}: Props) {
  const hasQuery = query.trim().length > 0;
  const hasResults = results.length > 0;

  // ⛔ no renderizar nada si no hay intención de búsqueda
  if (!hasQuery && !hasResults && !isSearching) {
    return null;
  }

  return (
    <div className="relative">
      {/* Overlay de loading (NO desmonta la lista) */}
      {isSearching && (
        <div className="absolute inset-0 z-10 rounded-md bg-white/60 backdrop-blur-sm">
          <div className="space-y-2 p-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between"
              >
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                <div className="h-6 w-20 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista persistente */}
      <ul className="rounded-md border bg-white shadow-sm">
        {hasResults ? (
          results.map((product) => (
            <li
              key={product.id}
              className={`flex items-center justify-between px-3 py-2 transition-colors ${
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
                className="rounded bg-primary px-3 py-1 text-sm font-medium text-white disabled:cursor-not-allowed"
              >
                Agregar
              </button>
            </li>
          ))
        ) : (
          !isSearching && (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              No se encontraron resultados
            </li>
          )
        )}
      </ul>
    </div>
  );
}