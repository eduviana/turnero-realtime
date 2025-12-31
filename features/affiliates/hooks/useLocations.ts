"use client";

import { useEffect, useState } from "react";

type ProvinceOption = {
  id: number;
  name: string;
};

type CityOption = {
  id: number;
  name: string;
  provinceId: number;
};

export function useLocations() {
  const [provinces, setProvinces] = useState<ProvinceOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [provRes, cityRes] = await Promise.all([
          fetch("/api/locations/provinces"),
          fetch("/api/locations/cities"),
        ]);

        const provJson = await provRes.json();
        const cityJson = await cityRes.json();

        setProvinces(provJson.data ?? []);
        setCities(cityJson.data ?? []);
      } catch (error) {
        console.error("Failed to load locations", error);
        setProvinces([]);
        setCities([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    provinces,
    cities,
    loading,
  };
}