"use client";

import { useEffect, useState } from "react";

interface UseSearchKeyboardNavigationProps<T> {
  results: T[];
  onSelect: (item: T) => void;
}

interface UseSearchKeyboardNavigationResult {
  activeIndex: number;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
}

export function useSearchKeyboardNavigation<T>({
  results,
  onSelect,
}: UseSearchKeyboardNavigationProps<T>): UseSearchKeyboardNavigationResult {
  const [activeIndex, setActiveIndex] = useState(-1);

  // Reset cuando cambian los resultados
  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!results.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev + 1 >= results.length ? 0 : prev + 1
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev <= 0 ? results.length - 1 : prev - 1
        );
        break;

      case "Enter":
        if (activeIndex >= 0) {
          e.preventDefault();
          onSelect(results[activeIndex]);
        }
        break;

      case "Escape":
        setActiveIndex(-1);
        break;
    }
  };

  const reset = () => setActiveIndex(-1);

  return {
    activeIndex,
    onKeyDown,
    reset,
  };
}