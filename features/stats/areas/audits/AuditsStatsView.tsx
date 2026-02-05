import { AuditsByActionChart } from "./components/AuditsByActionChart";
import { AuditsByEventTypeChart } from "./components/AuditsByEventTypeChart";
import { AuditsOverTimeChart } from "./components/AuditsOverTimeChart";




export function AuditsStatsView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="col-span-2">
        <AuditsOverTimeChart />
      </div>
      <AuditsByActionChart />
      <AuditsByEventTypeChart />
    </div>
  );
}