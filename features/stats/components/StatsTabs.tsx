
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersStatsView from "../areas/users/UsersStatsView";

// import UsersTab from "./tabs/UsersTab";
// import ServicesTab from "./tabs/ServicesTab";
// import AffiliatesTab from "./tabs/AffiliatesTab";
// import AuditsTab from "./tabs/AuditsTab";

export default function StatsTabs() {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid grid-cols-4 w-full max-w-xl">
        <TabsTrigger value="users">Usuarios</TabsTrigger>
        <TabsTrigger value="services">Servicios</TabsTrigger>
        <TabsTrigger value="affiliates">Afiliados</TabsTrigger>
        <TabsTrigger value="audits">Auditorías</TabsTrigger>
      </TabsList>

      <TabsContent value="users">
        <UsersStatsView />
      </TabsContent>

      <TabsContent value="services">
        {/* <ServicesTab /> */}
        <div>servicios</div>
      </TabsContent>

      <TabsContent value="affiliates">
        {/* <AffiliatesTab /> */}
        <div>afiliados</div>
      </TabsContent>

      <TabsContent value="audits">
        {/* <AuditsTab /> */}
        <div>auditorias</div>
      </TabsContent>
    </Tabs>
  );
}