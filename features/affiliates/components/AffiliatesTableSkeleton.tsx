import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function AffiliatesTableSkeleton() {
  const headers = [
    { label: "DNI", align: "text-left" },
    { label: "Nombre", align: "text-center" },
    { label: "Organización", align: "text-center" },
    { label: "Estado", align: "text-center" },
    { label: "Alta", align: "text-center" },
    { label: "Acciones", align: "text-center" },
  ];

  const columnsLayout = [
    { id: "dni", align: "text-left" },
    { id: "fullName", align: "text-center" },
    { id: "organization", align: "text-center" },
    { id: "status", align: "text-center" },
    { id: "createdAt", align: "text-center" },
    { id: "actions", align: "text-center" },
  ];
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        {/* HEADER */}
        <TableHeader className="bg-blue-950">
          <TableRow className="hover:bg-transparent">
            {headers.map(({ label, align }) => (
              <TableHead
                key={label}
                className={`h-18 px-4 text-secondary text-[1rem] ${align}`}
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columnsLayout.map((col, colIndex) => (
                <TableCell key={col.id} className={`p-4 ${col.align}`}>
                  {col.id === "status" && (
                    <Skeleton className="h-6 w-[90px] rounded-full mx-auto" />
                  )}

                  {col.id === "actions" && (
                    <div className="flex justify-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      
                    </div>
                  )}

                  {["dni", "fullName", "organization", "createdAt"].includes(
                    col.id,
                  ) && (
                    <Skeleton
                      className={
                        col.id === "dni"
                          ? "h-4 w-[90px]"
                          : col.id === "fullName"
                            ? "h-4 w-[160px] mx-auto"
                            : col.id === "organization"
                              ? "h-4 w-[260px] mx-auto"
                              : "h-4 w-[110px] mx-auto"
                      }
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
