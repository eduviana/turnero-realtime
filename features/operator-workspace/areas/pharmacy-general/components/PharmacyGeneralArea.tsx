"use client";

import { SelectedList } from "./SelectedList";
import { SearchResults } from "./SearchResults";
import { SearchInput } from "./SearchInput";
import { usePharmacyGeneralSearch } from "../hooks/usePharmacyGeneralSearch";
import { usePharmacyGeneralCart } from "../context/PharmacyGeneralCartContext";
import { useSearchKeyboardNavigation } from "../hooks/useSearchKeyboardNavigation";
import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";
import { useTurnQueue } from "@/features/turn-queue/hooks/useTurnQueue";
import { TicketStatus } from "@/generated/prisma/enums";

export function PharmacyGeneralArea() {
  const { service } = useOperatorService();
  const { state } = useTurnQueue(service?.id ?? "");

  const { items, increase, decrease, removeProduct, addProduct } =
    usePharmacyGeneralCart();

  const { query, setQuery, results, isSearching, hasSearched } =
    usePharmacyGeneralSearch();

  const canAddItems =
    state?.currentTicket?.status === TicketStatus.IN_PROGRESS;

  const handleSelectProduct = (product: { id: string; name: string }) => {
    if (!canAddItems) return;

    addProduct(product);
    setQuery("");
    keyboard.reset();
  };

  const keyboard = useSearchKeyboardNavigation({
    results,
    onSelect: handleSelectProduct,
  });

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Búsqueda */}
      <div className="relative">
        <div className="p-5 border-b border-slate-100">
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

      {/* Lista */}
      <SelectedList
        items={items}
        onIncrease={increase}
        onDecrease={decrease}
        onRemove={removeProduct}
        disabled={!canAddItems}
      />
    </section>
  );
}