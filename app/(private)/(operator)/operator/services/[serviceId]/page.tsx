"use client";
import { PharmacyMedicationsArea } from "@/features/operator-workspace/areas/pharmacy-medications/components/PharmacyMedicationsArea";
import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";

export default function OperatorServicePage() {
  const { service } = useOperatorService();

  if (!service) {
    return <div>Cargando servicio...</div>;
  }

  switch (service.code) {
    case "FM":
      return <PharmacyMedicationsArea />;
      
    case "FG":
      return <div>farmacia general</div>;

    case "AC":
      return <div>ac</div>;

    case "PF":
      return <div>pf</div>;

    case "AF":
      return <div>af</div>;

    case "AP":
      return <div>ap</div>;

    default:
      return <div>Servicio no soportado</div>;
  }
}
