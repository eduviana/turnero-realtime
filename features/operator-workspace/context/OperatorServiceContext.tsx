"use client";

import { createContext } from "react";

export interface OperatorServiceContextValue {
  operatorId: string;
  operatorName: string | null;

  service: {
    id: string;
    name: string;
    code: string;
    description?: string | null;
  };
}

export const OperatorServiceContext =
  createContext<OperatorServiceContextValue | null>(null);

interface OperatorServiceProviderProps {
  value: OperatorServiceContextValue;
  children: React.ReactNode;
}

export function OperatorServiceProvider({
  value,
  children,
}: OperatorServiceProviderProps) {
  return (
    <OperatorServiceContext.Provider value={value}>
      {children}
    </OperatorServiceContext.Provider>
  );
}