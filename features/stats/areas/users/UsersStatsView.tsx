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
    <div>
      <UsersActivityLineChart
        initialData={initialData}
        onGranularityChange={getUsersActivityTimelineAction}
      />

      <UsersByServiceChart data={data} />

      <UsersCompletedTicketsByServiceChart
        services={services}
        
      />
    </div>
  );
}