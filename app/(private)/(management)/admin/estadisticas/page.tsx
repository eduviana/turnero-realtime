import { OperatorsActivityLineChart } from "@/features/stats/components/OperatorsActivityLineChart";
import { getOperatorsActivityTimeline } from "@/features/stats/services/getOperatorsActivityTimeline";

export default async function UsersStatisticsPage() {
  const timeline = await getOperatorsActivityTimeline();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <OperatorsActivityLineChart data={timeline} />
    </div>
  );
}