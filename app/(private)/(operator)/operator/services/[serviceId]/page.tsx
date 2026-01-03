"use client"
import { useOperatorService } from "@/features/operator-workspace/hooks/useOperatorService";

// Views específicas por servicio
// import { CustomerServiceView } from "@/features/operator-workspace/services-ui/CustomerServiceView";
// import { BillingServiceView } from "@/features/operator-workspace/services-ui/BillingServiceView";
// import { AffiliationsServiceView } from "@/features/operator-workspace/services-ui/AffiliationsServiceView";
// import { PriorityServiceView } from "@/features/operator-workspace/services-ui/PriorityServiceView";
// import { PharmacyMedicinesServiceView } from "@/features/operator-workspace/services-ui/PharmacyMedicinesServiceView";
// import { PharmacyGeneralServiceView } from "@/features/operator-workspace/services-ui/PharmacyGeneralServiceView";
// import { DefaultServiceView } from "@/features/operator-workspace/services-ui/DefaultServiceView";

export default function OperatorServicePage() {
  const { service } = useOperatorService();

//   switch (service.code) {
//     case "AC":
//       return <CustomerServiceView service={service} />;

//     case "PF":
//       return <BillingServiceView service={service} />;

//     case "AF":
//       return <AffiliationsServiceView service={service} />;

//     case "AP":
//       return <PriorityServiceView service={service} />;

//     case "FM":
//       return <PharmacyMedicinesServiceView service={service} />;

//     case "FG":
//       return <PharmacyGeneralServiceView service={service} />;

//     default:
//       return <DefaultServiceView service={service} />;
//   }
}