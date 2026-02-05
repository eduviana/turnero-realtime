import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersStatsView from "../areas/users/UsersStatsView";
import ServicesStatsView from "../areas/services/ServicesStatsView";
import AffiliatesStatsView from "../areas/affiliates/AffiliatesStatsView";
import { AuditsStatsView } from "../areas/audits/AuditsStatsView";

const tabBase =
  "h-10 px-4 text-sm font-medium rounded-md transition-colors " +
  "focus-visible:outline-none focus-visible:ring-0 flex-none";

export default function StatsTabs() {
  return (
    <Tabs defaultValue="users" className="w-full">
      {/* Tabs header */}
      <TabsList className="flex w-fit justify-start gap-2 bg-transparent mx-auto my-4">
        <TabsTrigger
          value="users"
          className={`${tabBase}
            text-muted-foreground
            hover:bg-muted
            data-[state=active]:bg-primary
            data-[state=active]:text-primary-foreground
            data-[state=active]:hover:bg-primary`}
        >
          Usuarios
        </TabsTrigger>

        <TabsTrigger
          value="services"
          className={`${tabBase}
            text-muted-foreground
            hover:bg-muted
            data-[state=active]:bg-primary
            data-[state=active]:text-primary-foreground
            data-[state=active]:hover:bg-primary`}
        >
          Servicios
        </TabsTrigger>

        <TabsTrigger
          value="affiliates"
          className={`${tabBase}
            text-muted-foreground
            hover:bg-muted
            data-[state=active]:bg-primary
            data-[state=active]:text-primary-foreground
            data-[state=active]:hover:bg-primary`}
        >
          Afiliados
        </TabsTrigger>

        <TabsTrigger
          value="audits"
          className={`${tabBase}
            text-muted-foreground
            hover:bg-muted
            data-[state=active]:bg-primary
            data-[state=active]:text-primary-foreground
            data-[state=active]:hover:bg-primary`}
        >
          Auditorías
        </TabsTrigger>
      </TabsList>

      {/* Content */}
      <TabsContent value="users" className="pt-6">
        <UsersStatsView />
      </TabsContent>

      <TabsContent value="services" className="pt-6">
        <ServicesStatsView />
      </TabsContent>

      <TabsContent value="affiliates" className="pt-6">
        <AffiliatesStatsView />
      </TabsContent>

      <TabsContent value="audits" className="pt-6">
        <AuditsStatsView />
      </TabsContent>
    </Tabs>
  );
}
