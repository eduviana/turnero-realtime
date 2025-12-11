
import { Service } from "@/generated/prisma/client";
import { ServiceTableRow } from "../types/service";

export function toServiceTableRow(service: Service): ServiceTableRow {
  return {
    id: service.id,
    name: service.name,
    code: service.code,
    description: service.description ?? null,
    currentIndex: service.currentIndex,
    isActive: service.isActive,
    createdAt: service.createdAt.toISOString(),
  };
}