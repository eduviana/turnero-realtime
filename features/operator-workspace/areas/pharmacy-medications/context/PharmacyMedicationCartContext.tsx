"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { PharmacyMedicationCartItem } from "../types/pharmacy-medications";

interface PharmacyMedicationCartContextValue {
  items: PharmacyMedicationCartItem[];
  totalItems: number;

  addProduct: (product: { id: string; name: string }) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  clear: () => void;
}

const PharmacyMedicationCartContext =
  createContext<PharmacyMedicationCartContextValue | undefined>(undefined);

interface PharmacyMedicationCartProviderProps {
  children: ReactNode;
}

export function PharmacyMedicationCartProvider({
  children,
}: PharmacyMedicationCartProviderProps) {
  const [items, setItems] = useState<PharmacyMedicationCartItem[]>([]);

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

  const value = useMemo<PharmacyMedicationCartContextValue>(
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
    <PharmacyMedicationCartContext.Provider value={value}>
      {children}
    </PharmacyMedicationCartContext.Provider>
  );
}

export function usePharmacyMedicationCart() {
  const context = useContext(PharmacyMedicationCartContext);

  if (!context) {
    throw new Error(
      "usePharmacyMedicationCart must be used within PharmacyMedicationCartProvider"
    );
  }

  return context;
}