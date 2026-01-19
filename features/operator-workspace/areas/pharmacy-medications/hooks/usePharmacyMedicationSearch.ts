"use client";

import { useEffect, useState } from "react";

export interface PharmacyMedicationSearchResult {
  id: string;
  name: string;
}

interface UsePharmacyMedicationSearchResult {
  query: string;
  setQuery: (value: string) => void;
  results: PharmacyMedicationSearchResult[];
  isSearching: boolean;
  hasSearched: boolean;
}

export function usePharmacyMedicationSearch(): UsePharmacyMedicationSearchResult {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PharmacyMedicationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const controller = new AbortController();

    const search = async () => {
      try {
        setIsSearching(true);
        setHasSearched(false);

        const res = await fetch(
          `/api/pharmacy-medications/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Search request failed");
        }

        const data: PharmacyMedicationSearchResult[] = await res.json();
        setResults(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setResults([]);
        }
      } finally {
        setIsSearching(false);
        setHasSearched(true);
      }
    };

    search();

    return () => {
      controller.abort();
    };
  }, [query]);

  return {
    query,
    setQuery,
    results,
    isSearching,
    hasSearched,
  };
}