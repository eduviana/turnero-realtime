"use client";

import { useEffect, useState } from "react";
import { Organization } from "../types/organization";

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [organizationsLoading, setOrganizationsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchOrganizations() {
      try {
        const res = await fetch("/api/organizations");

        if (!res.ok) {
          throw new Error(`Error fetching organizations: ${res.status}`);
        }

        const json = await res.json();

        if (!cancelled) {
          setOrganizations(json.data ?? []);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setOrganizations([]);
        }
      } finally {
        if (!cancelled) {
          setOrganizationsLoading(false);
        }
      }
    }

    fetchOrganizations();

    return () => {
      cancelled = true;
    };
  }, []);

  return { organizations, organizationsLoading };
}