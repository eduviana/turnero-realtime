import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PharmacyGeneralOrdersPage from "./areas/pharmacy-general/PharmacyGeneralOrdersPage";

const tabBase =
  "h-10 px-4 text-sm font-medium rounded-md transition-colors " +
  "focus-visible:outline-none focus-visible:ring-0 flex-none";

export default function OrdersTabs() {
  return (
    <Tabs defaultValue="general" className="w-full">
      {/* Tabs header */}
      <TabsList className="flex w-fit justify-start gap-2 bg-transparent mx-auto my-4">
        <TabsTrigger
          value="general"
          className={`${tabBase}
            text-muted-foreground
            hover:bg-muted
            data-[state=active]:bg-primary
            data-[state=active]:text-primary-foreground
            data-[state=active]:hover:bg-primary`}
        >
          Farmacia General
        </TabsTrigger>

        <TabsTrigger
          value="medication"
          className={`${tabBase}
            text-muted-foreground
            hover:bg-muted
            data-[state=active]:bg-primary
            data-[state=active]:text-primary-foreground
            data-[state=active]:hover:bg-primary`}
        >
          Farmacia Medicamentos
        </TabsTrigger>
      </TabsList>

      {/* Content */}
      <TabsContent value="general" className="pt-6">
        <PharmacyGeneralOrdersPage />
      </TabsContent>

      <TabsContent value="medication" className="pt-6">
        farmacia medicamentos
      </TabsContent>
    </Tabs>
  );
}
