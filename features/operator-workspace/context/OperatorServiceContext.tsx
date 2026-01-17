"use client";

import { createContext } from "react";
import type { OperatorServiceContext } from "../types/operator";

// 👇 nombre distinto al type
export const OperatorServiceReactContext =
  createContext<OperatorServiceContext | null>(null);

interface OperatorServiceProviderProps {
  value: OperatorServiceContext;
  children: React.ReactNode;
}

export function OperatorServiceProvider({
  value,
  children,
}: OperatorServiceProviderProps) {
  return (
    <OperatorServiceReactContext.Provider value={value}>
      {children}
    </OperatorServiceReactContext.Provider>
  );
}
