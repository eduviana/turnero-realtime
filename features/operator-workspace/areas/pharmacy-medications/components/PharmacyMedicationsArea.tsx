// "use client";

// import { SelectedList } from "./SelectedList";
// import { usePharmacyMedicationSearch } from "../hooks/usePharmacyMedicationSearch";
// import { SearchResults } from "./SearchResults";
// import { SearchInput } from "./SearchInput";
// import { usePharmacyMedicationCart } from "../context/PharmacyMedicationCartContext";

// export function PharmacyMedicationsArea() {
//   const { items, increase, decrease, addProduct } = usePharmacyMedicationCart(); //hook del context condicional del layout

//   const { query, setQuery, results, isSearching } =
//     usePharmacyMedicationSearch();

//   const handleSelectProduct = (product: { id: string; name: string }) => {
//     addProduct(product);
//     setQuery(""); // limpia búsqueda
//   };

//   return (
//     <section className="container mx-auto">
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//         {/* Columna izquierda: búsqueda */}
//         <div className="md:col-span-2 space-y-2">
//           <SearchInput onSearch={setQuery} />

//           <SearchResults
//             results={results}
//             isSearching={isSearching}
//             onSelect={handleSelectProduct}
//           />
//         </div>

//         {/* Columna derecha: seleccionados */}
//         <div className="md:col-span-1">
//           <SelectedList
//             items={items}
//             onIncrease={increase}
//             onDecrease={decrease}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { SelectedList } from "./SelectedList";
import { SearchResults } from "./SearchResults";
import { SearchInput } from "./SearchInput";

import { usePharmacyMedicationSearch } from "../hooks/usePharmacyMedicationSearch";
import { usePharmacyMedicationCart } from "../context/PharmacyMedicationCartContext";

import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";

import { TicketStatus } from "@/generated/prisma/enums";
import { useTurnQueue } from "@/features/turn-queue/hooks/useTurnQueue";

export function PharmacyMedicationsArea() {
  /**
   * Contexts
   */
  const { service } = useOperatorService();
  const { state } = useTurnQueue(service?.id ?? "");

  const { items, increase, decrease, addProduct } = usePharmacyMedicationCart();

  /**
   * Search
   */
  const { query, setQuery, results, isSearching } =
    usePharmacyMedicationSearch();

  /**
   * Business rule:
   * Solo se pueden agregar items si el turno está IN_PROGRESS
   */
  const canAddItems = state?.currentTicket?.status === TicketStatus.IN_PROGRESS;

  /**
   * Handlers
   */
  const handleSelectProduct = (product: { id: string; name: string }) => {
    if (!canAddItems) return;

    addProduct(product);
    setQuery(""); // limpia búsqueda
  };

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Columna izquierda: búsqueda */}
        <div className="md:col-span-2 space-y-2">
          <SearchInput onSearch={setQuery} disabled={!canAddItems} />

          {!canAddItems && (
            <p className="text-xs text-muted-foreground">
              Iniciá la atención del turno para poder agregar productos
            </p>
          )}

          <SearchResults
            results={results}
            isSearching={isSearching}
            onSelect={handleSelectProduct}
            disabled={!canAddItems}
          />
        </div>

        {/* Columna derecha: seleccionados */}
        <div className="md:col-span-1">
          <SelectedList
            items={items}
            onIncrease={increase}
            onDecrease={decrease}
            disabled={!canAddItems}
          />
        </div>
      </div>
    </section>
  );
}
