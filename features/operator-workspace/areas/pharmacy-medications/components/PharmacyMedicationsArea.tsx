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
import { useSearchKeyboardNavigation } from "../hooks/useSearchKeyboardNavigation";

import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
import { useTurnQueue } from "@/features/turn-queue/hooks/useTurnQueue";

import { TicketStatus } from "@/generated/prisma/enums";

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
  const { query, setQuery, results, isSearching, hasSearched } =
    usePharmacyMedicationSearch();

  /**
   * Business rule
   */
  const canAddItems = state?.currentTicket?.status === TicketStatus.IN_PROGRESS;

  /**
   * Select product
   */
  const handleSelectProduct = (product: { id: string; name: string }) => {
    if (!canAddItems) return;

    addProduct(product);
    setQuery("");
    keyboard.reset();
  };

  /**
   * Keyboard navigation
   */
  const keyboard = useSearchKeyboardNavigation({
    results,
    onSelect: handleSelectProduct,
  });

  return (
    <section className="space-y-12">
      {/* BLOQUE BÚSQUEDA (70%) */}
      <div className="relative w-full max-w-[70%] mx-auto">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-5">
            <SearchInput
              value={query}
              onSearch={setQuery}
              onKeyDown={keyboard.onKeyDown}
              disabled={!canAddItems}
              helperText={
                !canAddItems
                  ? "Iniciá la atención del turno para poder agregar productos"
                  : undefined
              }
            />
          </div>
        </div>

        <SearchResults
          results={results}
          isSearching={isSearching}
          query={query}
          hasSearched={hasSearched}
          onSelect={handleSelectProduct}
          disabled={!canAddItems}
          activeIndex={keyboard.activeIndex}
        />
      </div>

      {/* BLOQUE LISTA (100%) */}
      <SelectedList
        items={items}
        onIncrease={increase}
        onDecrease={decrease}
        disabled={!canAddItems}
      />
    </section>
  );
}
