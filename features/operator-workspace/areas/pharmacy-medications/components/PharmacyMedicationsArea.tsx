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
