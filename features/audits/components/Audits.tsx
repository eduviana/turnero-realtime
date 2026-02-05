

// "use client";

// import { DataTable } from "@/components/ui/data-table";
// import { auditColumns } from "../columns";
// import { AuditLogRow } from "../types/audit";


// interface AuditsProps {
//   data: AuditLogRow[];
// }

// export function Audits({ data }: AuditsProps) {
//   return (
//     <DataTable
//       columns={auditColumns}
//       data={data}
//     />
//   );
// }






"use client";

import { useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { auditColumns } from "../columns";
import { AuditLogRow } from "../types/audit";
import { AuditDetailModal } from "./AuditDetailModal";

interface AuditsProps {
  data: AuditLogRow[];
}

export function Audits({ data }: AuditsProps) {
  const [selectedAudit, setSelectedAudit] =
    useState<AuditLogRow | null>(null);

  /**
   * Columns builder con callback de "ver detalle"
   */
  const columns = auditColumns({
    onView: setSelectedAudit,
  });

  return (
    <>
      <DataTable columns={columns} data={data} />

      <AuditDetailModal
        open={Boolean(selectedAudit)}
        audit={selectedAudit}
        onClose={() => setSelectedAudit(null)}
      />
    </>
  );
}