import { getTicketsByServiceAction } from "./actions/getTicketsByServiceAction";
import { AvgServiceAttentionTimeChart } from "./components/AvgServiceAttentionTimeChart";
import { AvgTicketDurationByUserChart } from "./components/AvgTicketDurationByUserChart";
import { TicketsByServiceChart } from "./components/TicketsByServiceChart";

export default async function ServicesStatsView() {
  // métrica inicial
  const initialData = await getTicketsByServiceAction("completed");

  return (
    <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <TicketsByServiceChart
        initialData={initialData}
        onMetricChange={getTicketsByServiceAction}
      />
      </div>
      <AvgServiceAttentionTimeChart />
      <AvgTicketDurationByUserChart />
    </div>
  );
}
