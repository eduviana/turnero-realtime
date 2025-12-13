import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingUsersTable() {
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
                {["w-32", "w-32", "w-48", "w-24", "w-32", "w-14"].map(
                  (width, i) => (
                    <th key={i} className={`p-2 ${width}`}>
                      <Skeleton className="h-6 w-full" />
                    </th>
                  )
                )}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {Array.from({ length: 3 }).map((_, rowIdx) => (
                <tr key={rowIdx} className="border-b">
                  {["w-32", "w-32", "w-48", "w-24", "w-32", "w-14"].map(
                    (width, colIdx) => (
                      <td key={colIdx} className={`p-4 ${width}`}>
                        {colIdx === 5 ? (
                          <Skeleton className="h-7 w-7 rounded-md" />
                        ) : (
                          <Skeleton className="h-7 w-full" />
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-between mt-6">
          <Skeleton className="h-5 w-64" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
