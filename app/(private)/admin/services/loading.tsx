import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingServicesTable() {
  const columnWidths = ["w-32", "w-32", "w-48", "w-14", "w-32"]; // 5 columnas

  return (
    <div className="container mx-auto py-10">
      <div className="w-full">
        {/* Top Bar Skeleton */}
        <div className="flex items-center py-4">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-10 w-32 ml-auto" />
        </div>

        {/* Table Skeleton */}
        <div className="rounded-md border overflow-hidden">
          <table className="w-full table-fixed">
            {/* Header */}
            <thead className="h-14">
              <tr className="border-b">
                {columnWidths.map((width, i) => (
                  <th key={i} className={`p-2 ${width}`}>
                    <Skeleton className="h-6 w-full" />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {Array.from({ length: 7 }).map((_, rowIdx) => (
                <tr key={rowIdx} className="border-b">
                  {columnWidths.map((width, colIdx) => (
                    <td key={colIdx} className={`p-4 ${width}`}>
                      {colIdx === 3 ? (
                        // Cuarta columna: ícono cuadrado pequeño (similar a w-14)
                        <Skeleton className="h-7 w-7 rounded-md" />
                      ) : (
                        <Skeleton className="h-7 w-full" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Skeleton */}
        <div className="flex gap-4 justify-end mt-6">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}
