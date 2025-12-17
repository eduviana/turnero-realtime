import { AffiliatesTable } from "@/features/admin/affiliates/components/AffiliatesTable";

export default function AffiliatesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Afiliados</h1>
      <AffiliatesTable />
    </div>
  );
}
