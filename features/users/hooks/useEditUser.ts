// import { useEffect, useMemo, useState } from "react";

// import { getUserById } from "../services/getUserById";
// import { updateUserServices } from "../services/updateUserServices";

// import type {
//   UserWithStatus,
//   UserServiceAssignment,
// } from "../types/users";

// import type {
//   EditableService,
//   Service,
//   UserServicesUpdateResult,
// } from "@/features/service/types/service";

// import { getAllServicesClient } from "@/features/service/services/getAllServicesClient";

// interface UseEditUserArgs {
//   userId: string;
//   onUpdated: (data: UserServicesUpdateResult) => void;
//   onClose: () => void;
// }

// export function useEditUser({
//   userId,
//   onUpdated,
//   onClose,
// }: UseEditUserArgs) {
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [user, setUser] = useState<UserWithStatus | null>(null);
//   const [services, setServices] = useState<EditableService[]>([]);
//   const [allServices, setAllServices] = useState<Service[]>([]);
//   const [loadingServices, setLoadingServices] = useState(false);

//   // ───────────────────────────────
//   // Load user
//   // ───────────────────────────────
//   useEffect(() => {
//     const loadUser = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const data = await getUserById(userId);
//         setUser(data);

//         const mapped: EditableService[] = data.services.map(
//           (assignment: UserServiceAssignment) => ({
//             serviceId: assignment.service.id,
//             name: assignment.service.name,
//             code: assignment.service.code,
//             assigned: true,
//             isPrimary: assignment.isPrimary,
//           })
//         );

//         setServices(mapped);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "Error al cargar el usuario"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, [userId]);

//   // ───────────────────────────────
//   // Load all services
//   // ───────────────────────────────
//   useEffect(() => {
//     const loadServices = async () => {
//       setLoadingServices(true);
//       try {
//         const data = await getAllServicesClient();
//         setAllServices(data);
//       } finally {
//         setLoadingServices(false);
//       }
//     };

//     loadServices();
//   }, []);

//   // ───────────────────────────────
//   // Derived data
//   // ───────────────────────────────
//   const availableServices = useMemo(
//     () =>
//       allServices.filter(
//         (service) => !services.some((s) => s.serviceId === service.id)
//       ),
//     [allServices, services]
//   );

//   // ───────────────────────────────
//   // Actions
//   // ───────────────────────────────
//   const toggleService = (serviceId: string) => {
//     setServices((prev) =>
//       prev.map((s) =>
//         s.serviceId === serviceId
//           ? { ...s, assigned: !s.assigned, isPrimary: false }
//           : s
//       )
//     );
//   };


//   const addService = (service: Service) => {
//     setServices((prev) => [
//       ...prev,
//       {
//         serviceId: service.id,
//         name: service.name,
//         code: service.code,
//         assigned: true,
//         isPrimary: false,
//       },
//     ]);
//   };


//   const handleSave = async () => {
//     setSaving(true);
//     setError(null);

//     try {
//       await updateUserServices(userId, services);

//       const serviceCodes = services
//         .filter((s) => s.assigned)
//         .sort((a, b) => (a.isPrimary ? -1 : 1))
//         .map((s) => s.code);

//       onUpdated({
//         userId,
//         serviceCodes,
//       });

//       onClose();
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Error al guardar los cambios"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   return {
//     // state
//     user,
//     services,
//     availableServices,
//     loading,
//     loadingServices,
//     saving,
//     error,

//     // actions
//     toggleService,
//     addService,
//     handleSave,
//   };
// }



import { useEffect, useMemo, useState } from "react";

import { getUserById } from "../services/getUserById";
import { updateUserServices } from "../services/updateUserServices";

import type {
  UserWithStatus,
  UserServiceAssignment,
} from "../types/users";

import type {
  EditableService,
  Service,
  UserServicesUpdateResult,
} from "@/features/service/types/service";

import { useServices } from "@/features/service/hooks/useServices";

interface UseEditUserArgs {
  userId: string;
  onUpdated: (data: UserServicesUpdateResult) => void;
  onClose: () => void;
}

export function useEditUser({
  userId,
  onUpdated,
  onClose,
}: UseEditUserArgs) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState<UserWithStatus | null>(null);
  const [services, setServices] = useState<EditableService[]>([]);

  // Servicios globales (solo lectura)
  const {
    services: allServices,
    loading: loadingServices,
  } = useServices();

  // ───────────────────────────────
  // Load user
  // ───────────────────────────────
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getUserById(userId);
        setUser(data);

        const mapped: EditableService[] = data.services.map(
          (assignment: UserServiceAssignment) => ({
            serviceId: assignment.service.id,
            name: assignment.service.name,
            code: assignment.service.code,
            assigned: true,
            isPrimary: assignment.isPrimary,
          })
        );

        setServices(mapped);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar el usuario"
        );
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  // ───────────────────────────────
  // Derived data
  // ───────────────────────────────
  const availableServices = useMemo(
    () =>
      allServices.filter(
        (service) => !services.some((s) => s.serviceId === service.id)
      ),
    [allServices, services]
  );

  // ───────────────────────────────
  // Actions
  // ───────────────────────────────
  const toggleService = (serviceId: string) => {
    setServices((prev) =>
      prev.map((s) =>
        s.serviceId === serviceId
          ? { ...s, assigned: !s.assigned, isPrimary: false }
          : s
      )
    );
  };

  const addService = (service: Service) => {
    setServices((prev) => [
      ...prev,
      {
        serviceId: service.id,
        name: service.name,
        code: service.code,
        assigned: true,
        isPrimary: false,
      },
    ]);
  };

  // ───────────────────────────────
  // Save
  // ───────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      await updateUserServices(userId, services);

      const serviceCodes = services
        .filter((s) => s.assigned)
        .sort((a, b) => (a.isPrimary ? -1 : 1))
        .map((s) => s.code);

      onUpdated({
        userId,
        serviceCodes,
      });

      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al guardar los cambios"
      );
    } finally {
      setSaving(false);
    }
  };

  return {
    // state
    user,
    services,
    availableServices,
    loading,
    loadingServices,
    saving,
    error,

    // actions
    toggleService,
    addService,
    handleSave,
  };
}