import { useEffect, useState } from "react";
import { getAllServicesClient } from "@/features/service/services/getAllServicesClient";
import type { Service } from "@/features/service/types/service";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllServicesClient();
        setServices(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar servicios"
        );
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return {
    services,
    loading,
    error,
  };
}