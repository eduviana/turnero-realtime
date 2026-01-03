import { DashboardGrid } from "@/features/dashboard/components/DashboardGrid";
import { getDashboardAffiliatesStats } from "@/features/dashboard/services/getDashboardAffiliatesStats";
import { getDashboardServicesStats } from "@/features/dashboard/services/getDashboardServicesStats";
import { getDashboardUsersStats } from "@/features/dashboard/services/getDashboardUsersStats";

export default async function AdminDashboardPage() {
  const [usersStats, servicesStats, affiliatesStats] = await Promise.all([
    getDashboardUsersStats(),
    getDashboardServicesStats(),
    getDashboardAffiliatesStats()
  ]);

  return (
    <div className="container mx-auto py-6">
      <DashboardGrid
        usersStats={usersStats}
        servicesStats={servicesStats}
        affiliatesStats={affiliatesStats}
      />
    </div>
  );
}