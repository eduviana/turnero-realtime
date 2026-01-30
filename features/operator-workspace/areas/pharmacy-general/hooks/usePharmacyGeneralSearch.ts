"use client";

import { useEffect, useRef, useState } from "react";

export interface PharmacyGeneralSearchResult {
  id: string;
  name: string;
}

interface UsePharmacyGeneralSearchResult {
  query: string;
  setQuery: (value: string) => void;
  results: PharmacyGeneralSearchResult[];
  isSearching: boolean;
  hasSearched: boolean;
}

const SKELETON_DELAY_MS = 250;

export function usePharmacyGeneralSearch(): UsePharmacyGeneralSearchResult {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PharmacyGeneralSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const skeletonTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setHasSearched(false);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();

    skeletonTimerRef.current = setTimeout(() => {
      setIsSearching(true);
    }, SKELETON_DELAY_MS);

    const search = async () => {
      try {
        const res = await fetch(
          `/api/pharmacy-general/search?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Search failed");
        }

        const data: PharmacyGeneralSearchResult[] = await res.json();
        setResults(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("[usePharmacyGeneralSearch]", err);
        }
      } finally {
        if (skeletonTimerRef.current) {
          clearTimeout(skeletonTimerRef.current);
        }

        setIsSearching(false);
        setHasSearched(true);
      }
    };

    search();

    return () => {
      controller.abort();

      if (skeletonTimerRef.current) {
        clearTimeout(skeletonTimerRef.current);
      }
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