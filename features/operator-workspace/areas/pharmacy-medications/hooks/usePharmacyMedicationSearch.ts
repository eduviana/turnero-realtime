// "use client";

// import { useEffect, useState } from "react";

// export interface PharmacyMedicationSearchResult {
//   id: string;
//   name: string;
// }

// interface UsePharmacyMedicationSearchResult {
//   query: string;
//   setQuery: (value: string) => void;
//   results: PharmacyMedicationSearchResult[];
//   isSearching: boolean;
//   hasSearched: boolean;
// }

// export function usePharmacyMedicationSearch(): UsePharmacyMedicationSearchResult {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<PharmacyMedicationSearchResult[]>([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);

//   useEffect(() => {
//     if (!query || query.trim().length < 2) {
//       setResults([]);
//       setHasSearched(false);
//       return;
//     }

//     const controller = new AbortController();

//     const search = async () => {
//       try {
//         setIsSearching(true);
//         setHasSearched(false);

//         const res = await fetch(
//           `/api/pharmacy-medications/search?q=${encodeURIComponent(query)}`,
//           { signal: controller.signal }
//         );

//         if (!res.ok) {
//           throw new Error("Search request failed");
//         }

//         const data: PharmacyMedicationSearchResult[] = await res.json();
//         setResults(data);
//       } catch (err) {
//         if ((err as Error).name !== "AbortError") {
//           setResults([]);
//         }
//       } finally {
//         setIsSearching(false);
//         setHasSearched(true);
//       }
//     };

//     search();

//     return () => {
//       controller.abort();
//     };
//   }, [query]);

//   return {
//     query,
//     setQuery,
//     results,
//     isSearching,
//     hasSearched,
//   };
// }



"use client";

import { useEffect, useRef, useState } from "react";

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

const SKELETON_DELAY_MS = 250;

export function usePharmacyMedicationSearch(): UsePharmacyMedicationSearchResult {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PharmacyMedicationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const skeletonTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setHasSearched(false); // 🔑 reset real
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();

    // ⏳ mostrar skeleton solo si la búsqueda tarda
    skeletonTimerRef.current = setTimeout(() => {
      setIsSearching(true);
    }, SKELETON_DELAY_MS);

    const search = async () => {
      try {
        const res = await fetch(
          `/api/pharmacy-medications/search?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Search failed");
        }

        const data: PharmacyMedicationSearchResult[] = await res.json();
        setResults(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("[usePharmacyMedicationSearch]", err);
        }
      } finally {
        // 🧹 limpiar skeleton siempre
        if (skeletonTimerRef.current) {
          clearTimeout(skeletonTimerRef.current);
        }

        setIsSearching(false);
        setHasSearched(true); // ✅ SOLO cuando terminó la búsqueda
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