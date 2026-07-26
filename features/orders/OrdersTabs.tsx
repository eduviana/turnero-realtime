import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PharmacyGeneralOrdersPage from "./areas/pharmacy-general/PharmacyGeneralOrdersPage";
import PharmacyMedicationOrdersPage from "./areas/pharmacy-medication/PharmacyMedicationOrdersPage";

const tabBase =
  "h-10 px-4 text-sm font-medium rounded transition-colors " +
  "focus-visible:outline-none focus-visible:ring-0 flex-none";

export default function OrdersTabs() {
  return (
    <Tabs defaultValue="general" className="w-full">
      {/* Tabs header */}
      <TabsList className="flex w-fit justify-start gap-2 bg-transparent mx-auto my-4">
        <TabsTrigger
          value="general"
          className={`${tabBase}
            text-gray-600
            bg-white border border-gray-200
            hover:bg-gray-50
            data-[state=active]:bg-[#1e293b]
            data-[state=active]:text-white
            data-[state=active]:border-transparent
            data-[state=active]:hover:bg-[#1e293b]`}
        >
          Farmacia General
        </TabsTrigger>

        <TabsTrigger
          value="medication"
          className={`${tabBase}
            text-gray-600
            bg-white border border-gray-200
            hover:bg-gray-50
            data-[state=active]:bg-[#1e293b]
            data-[state=active]:text-white
            data-[state=active]:border-transparent
            data-[state=active]:hover:bg-[#1e293b]`}
        >
          Farmacia Medicamentos
        </TabsTrigger>
      </TabsList>

      {/* Content */}
      <TabsContent value="general" className="pt-6">
        <PharmacyGeneralOrdersPage />
      </TabsContent>

      <TabsContent value="medication" className="pt-6">
        <PharmacyMedicationOrdersPage />
      </TabsContent>
    </Tabs>
  );
}
