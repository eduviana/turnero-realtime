


import { AffiliatesByStatusPieChart } from "./components/AffiliatesByStatusPieChart";
import { SuspendedAffiliatesByReasonPieChart } from "./components/SuspendedAffiliatesByReasonPieChart";

export default async function AffiliatesStatsView() {
  return (
    <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
      {/* Full width */}
      
        <SuspendedAffiliatesByReasonPieChart />
        <AffiliatesByStatusPieChart />
      
    </div>
  );
}