import { Audits } from "@/features/admin/audits/components/Audits";
import { getAuditLogs } from "@/features/admin/audits/services/getAuditLogs";





export default async function AuditoriasPage() {
  const audits = await getAuditLogs();
  console.log(audits)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Auditorías</h1>
      <Audits data={audits} />
    </div>
  );
}