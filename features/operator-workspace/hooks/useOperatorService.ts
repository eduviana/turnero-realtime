"use client";

import { useContext } from "react";
import { OperatorServiceContext } from "../context/OperatorServiceContext";

export function useOperatorService() {
  const context = useContext(OperatorServiceContext);

  if (!context) {
    throw new Error(
      "useOperatorService must be used within OperatorServiceProvider"
    );
  }

  return context;
}