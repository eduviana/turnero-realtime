import { DashboardGrid } from "@/features/dashboard/components/DashboardGrid";
import { getDashboardAffiliatesStats } from "@/features/dashboard/services/getDashboardAffiliatesStats";
import { getDashboardServicesStats } from "@/features/dashboard/services/getDashboardServicesStats";
import { getDashboardUsersStats } from "@/features/dashboard/services/getDashboardUsersStats";
import {
  getDashboardTicketStats,
  getRecentTickets,
  getTicketsByServiceToday,
} from "@/features/dashboard/services/getDashboardTicketStats";
import { TicketsMetricsBar } from "@/features/dashboard/components/TicketsMetricsBar";
import { RecentTicketsTable } from "@/features/dashboard/components/RecentTicketsTable";
import { TicketsByServiceChart } from "@/features/dashboard/components/TicketsByServiceChart";

export default async function AdminDashboardPage() {
  const [usersStats, servicesStats, affiliatesStats, ticketStats, recentTickets, ticketsByService] =
    await Promise.all([
      getDashboardUsersStats(),
      getDashboardServicesStats(),
      getDashboardAffiliatesStats(),
      getDashboardTicketStats(),
      getRecentTickets(),
      getTicketsByServiceToday(),
    ]);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <DashboardGrid
        usersStats={usersStats}
        servicesStats={servicesStats}
        affiliatesStats={affiliatesStats}
      />

      <TicketsMetricsBar stats={ticketStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <RecentTicketsTable tickets={recentTickets} />
        </div>
        <div className="flex flex-col">
          <TicketsByServiceChart data={ticketsByService} />
        </div>
      </div>
    </div>
  );
}
