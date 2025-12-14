// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { AffiliateTableRow } from "../types/affiliate";
// import {
//   affiliateFiltersSchema,
//   AffiliateFiltersForm,
// } from "../schemas/affiliateFiltersSchema";

// const DEFAULT_VALUES: AffiliateFiltersForm = {
//   dni: "",
//   organization: "",
//   province: "",
//   city: "",
//   status: undefined,
//   statusReason: undefined,
//   createdFrom: undefined,
//   createdTo: undefined,
//   limit: 20,
// };

// export function useAffiliateSearch() {
//   const [data, setData] = useState<AffiliateTableRow[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);

//   const form = useForm<AffiliateFiltersForm>({
//     resolver: zodResolver(affiliateFiltersSchema),
//     defaultValues: DEFAULT_VALUES,
//     mode: "onSubmit",
//   });

//   /**
//    * Submit principal del formulario (ya validado por RHF + Zod)
//    */
//   const submitSearch = form.handleSubmit(async (values) => {
//     try {
//       setLoading(true);
//       setHasSearched(true);

//       const payload = {
//         ...values,
//         createdFrom: values.createdFrom
//           ? new Date(values.createdFrom)
//           : undefined,
//         createdTo: values.createdTo ? new Date(values.createdTo) : undefined,
//       };

//       const res = await fetch("/api/affiliate/search", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const json = await res.json();

//       if (!res.ok) {
//         console.error("Affiliate search failed:", json.error || json);
//         setData([]);
//         return;
//       }

//       setData(Array.isArray(json.data) ? json.data : []);
//     } catch (error) {
//       console.error("Affiliate search failed:", error);
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   });

//   function resetFilters() {
//     form.reset(DEFAULT_VALUES);
//     setData([]);
//     setHasSearched(false);
//   }

//   return {
//     form,
//     data,
//     loading,
//     hasSearched,
//     submitSearch, // 👈 nombre correcto y explícito
//     resetFilters,
//   };
// }




"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AffiliateTableRow } from "../types/affiliate";
import {
  affiliateFiltersSchema,
  AffiliateFiltersForm,
} from "../schemas/affiliateFiltersSchema";

const DEFAULT_VALUES: AffiliateFiltersForm = {
  dni: "",
  organization: "",
  provinceId: undefined,
  cityId: undefined,
  status: undefined,
  statusReason: undefined,
  createdFrom: "",
  createdTo: "",
  limit: 20,
};

export function useAffiliateSearch() {
  const [data, setData] = useState<AffiliateTableRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<AffiliateFiltersForm>({
    resolver: zodResolver(affiliateFiltersSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onSubmit",
  });

  /**
   * Submit validado por Zod
   * - Envía solo valores serializables
   * - La adaptación a Date ocurre en route.ts
   */
  const submitSearch = form.handleSubmit(async (values) => {
    try {
      setLoading(true);
      setHasSearched(true);

      const res = await fetch("/api/affiliate/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("Affiliate search failed:", json.error || json);
        setData([]);
        return;
      }

      setData(Array.isArray(json.data) ? json.data : []);
    } catch (error) {
      console.error("Affiliate search failed:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  });

  function resetFilters() {
    form.reset(DEFAULT_VALUES);
    setData([]);
    setHasSearched(false);
  }

  return {
    form,
    data,
    loading,
    hasSearched,
    submitSearch,
    resetFilters,
  };
}