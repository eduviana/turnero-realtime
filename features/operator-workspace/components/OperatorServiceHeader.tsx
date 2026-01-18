"use client";

import { BriefcaseMedical } from "lucide-react";
import { useOperatorService } from "../hooks/useOperatorService";

export function OperatorServiceHeader() {
  const { operator, service } = useOperatorService();

  return (
    <header className="bg-primary">
      <div className="container mx-auto flex justify-between p-6">
        <div className="flex gap-2 items-center">
          <BriefcaseMedical className="h-8 w-8 text-blue-400" />
          <h1 className="text-white text-2xl font-bold">{service.name}</h1>
        </div>

        <p className="text-white mt-1 text-sm">
          <span className="font-medium">
            {operator.firstName} {operator.lastName}
          </span>
        </p>
      </div>
    </header>
  );
}
