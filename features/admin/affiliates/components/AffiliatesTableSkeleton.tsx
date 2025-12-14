import { Skeleton } from "@/components/ui/skeleton";

export function AffiliatesTableSkeleton() {
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full border-collapse">
        {/* HEADER */}
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">
              DNI
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Nombre
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Organización
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Estado
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Alta
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i} className="border-t">
              {/* DNI */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-[90px]" />
              </td>

              {/* Nombre */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-[160px]" />
              </td>

              {/* Organización */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-[260px]" />
              </td>

              {/* Estado */}
              <td className="px-4 py-3">
                <Skeleton className="h-6 w-[90px] rounded-full" />
              </td>

              {/* Alta */}
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-[110px]" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}