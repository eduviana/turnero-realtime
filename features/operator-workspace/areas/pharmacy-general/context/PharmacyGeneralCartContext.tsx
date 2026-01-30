"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { PharmacyGeneralCartItem } from "../types/pharmacy-general";


interface PharmacyGeneralCartContextValue {
  items: PharmacyGeneralCartItem[];
  totalItems: number;

  addProduct: (product: { id: string; name: string }) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  clear: () => void;
}

const PharmacyGeneralCartContext =
  createContext<PharmacyGeneralCartContextValue | undefined>(undefined);

interface PharmacyGeneralCartProviderProps {
  children: ReactNode;
}

export function PharmacyGeneralCartProvider({
  children,
}: PharmacyGeneralCartProviderProps) {
  const [items, setItems] = useState<PharmacyGeneralCartItem[]>([]);

  const addProduct = useCallback((product: { id: string; name: string }) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          quantity: 1,
        },
      ];
    });
  }, []);

  const increase = useCallback((productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decrease = useCallback((productId: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const value = useMemo<PharmacyGeneralCartContextValue>(
    () => ({
      items,
      totalItems,
      addProduct,
      increase,
      decrease,
      clear,
    }),
    [items, totalItems, addProduct, increase, decrease, clear]
  );

  return (
    <PharmacyGeneralCartContext.Provider value={value}>
      {children}
    </PharmacyGeneralCartContext.Provider>
  );
}

export function usePharmacyGeneralCart() {
  const context = useContext(PharmacyGeneralCartContext);

  if (!context) {
    throw new Error(
      "usePharmacyGeneralCart must be used within PharmacyGeneralCartProvider"
    );
  }

  return context;
}