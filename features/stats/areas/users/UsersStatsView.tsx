import UsersActivityLineChart from "./components/UsersActivityLineChart";
import { getUsersByService } from "./services/getUsersByService";
import { UsersByServiceChart } from "./components/UsersByServiceChart";
import { UsersCompletedTicketsByServiceChart } from "./components/UsersCompletedTicketsByServiceChart";
import { getServices } from "./services/getServices";
import { getUsersActivityTimelineAction } from "./actions/getUsersActivityTimelineAction";

export default async function UsersStatsView() {
  const initialData = await getUsersActivityTimelineAction("day");
  const data = await getUsersByService();
  const services = await getServices();

  return (
    <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
      {/* Full width */}
      <div className="lg:col-span-2">
        <UsersActivityLineChart
          initialData={initialData}
          onGranularityChange={getUsersActivityTimelineAction}
        />
      </div>

      {/* Half width */}
      <UsersByServiceChart data={data} />
      <UsersCompletedTicketsByServiceChart services={services} />
    </div>
  );
}