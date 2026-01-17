"use client";

import { useContext } from "react";
import { OperatorServiceReactContext } from "../context/OperatorServiceContext";

export function useOperatorService() {
  const context = useContext(OperatorServiceReactContext);

  if (!context) {
    throw new Error(
      "useOperatorService must be used within OperatorServiceProvider"
    );
  }

  return context;
}