import { ServiceItem } from "../types/services";

export async function getAllServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch("/api/services/find-all", {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Error obteniendo los servicios.");
    }

    const data = await res.json();
    return data.services as ServiceItem[];
  } catch {
    throw new Error("Error de conexión.");
  }
}
