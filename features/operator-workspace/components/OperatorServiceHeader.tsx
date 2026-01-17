"use client";

import { useOperatorService } from "../hooks/useOperatorService";

export function OperatorServiceHeader() {
  const { operator, service } = useOperatorService();

  return (
    <header className="bg-primary">
      <div className="container mx-auto flex justify-between p-6">
        <h1 className="text-white text-2xl font-bold">
          {service.name}
        </h1>

        <p className="text-white mt-1 text-sm">
          <span className="font-medium">
            {operator.firstName} {operator.lastName}
          </span>
        </p>
      </div>
    </header>
  );
}