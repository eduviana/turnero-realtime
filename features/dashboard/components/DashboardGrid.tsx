import type {
  DashboardUsersStats,
  DashboardServicesStats,
  DashboardAffiliatesStats,
} from "../types/dashboard";
import { AffiliatesSummaryCard } from "./AffiliatesSummaryCard";
import { ServicesSummaryCard } from "./ServicesSummaryCard";
import { UsersSummaryCard } from "./UsersSummaryCard";

interface DashboardGridProps {
  usersStats: DashboardUsersStats;
  servicesStats: DashboardServicesStats;
  affiliatesStats: DashboardAffiliatesStats
}

export function DashboardGrid({
  usersStats,
  servicesStats,
  affiliatesStats,
}: DashboardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <UsersSummaryCard stats={usersStats} />
      <ServicesSummaryCard stats={servicesStats} />
      <AffiliatesSummaryCard stats={affiliatesStats}/>
    </div>
  );
}