// "use client";

// import { Card, CardContent, CardHeader } from "@/components/ui/card";

// interface Props {
//   className?: string;
// }

// export function UserViewSkeleton({ className = "" }: Props) {
//   return (
//     // La Card mantiene el layout y el tamaño
//     <Card className={`overflow-hidden animate-pulse w-full ${className}`}>
//       <CardHeader className="flex flex-col items-center gap-4 p-6 bg-muted/30 border-b">
//         <div className="w-24 h-24 rounded-full bg-muted" />

//         <div className="text-center flex flex-col items-center gap-2">
//           <div className="w-40 h-5 bg-muted rounded" />
//           <div className="w-20 h-4 bg-muted rounded" />
//         </div>
//       </CardHeader>

//       <CardContent className="p-6 space-y-6">
//         <div className="space-y-1">
//           <div className="w-20 h-4 bg-muted rounded" />
//           <div className="w-full h-4 bg-muted/70 rounded" />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-1">
//             <div className="w-20 h-4 bg-muted rounded" />
//             <div className="w-full h-4 bg-muted/70 rounded" />
//           </div>

//           <div className="space-y-1">
//             <div className="w-20 h-4 bg-muted rounded" />
//             <div className="w-full h-4 bg-muted/70 rounded" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
//           <div className="space-y-1">
//             <div className="w-28 h-4 bg-muted rounded" />
//             <div className="w-32 h-4 bg-muted/70 rounded" />
//           </div>

//           <div className="space-y-1">
//             <div className="w-32 h-4 bg-muted rounded" />
//             <div className="w-28 h-4 bg-muted/70 rounded" />
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  className?: string;
}

export function UserViewSkeleton({ className = "" }: Props) {
  return (
    <Card className={`overflow-hidden w-full ${className}`}>
      {/* Header */}
      <CardHeader className="flex flex-col items-center gap-4 p-6 bg-muted/30 border-b">
        {/* Avatar */}
        <Skeleton className="w-24 h-24 rounded-full" />

        {/* Name + Role */}
        <div className="text-center flex flex-col items-center gap-2">
          <Skeleton className="w-40 h-5" />
          <Skeleton className="w-20 h-4" />
        </div>
      </CardHeader>

      {/* Body */}
      <CardContent className="p-6 space-y-6">
        {/* Email */}
        <div className="space-y-1">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-full h-4" />
        </div>

        {/* Nombre + Apellido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-4" />
          </div>

          <div className="space-y-1">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <Skeleton className="w-28 h-4" />
            <Skeleton className="w-32 h-4" />
          </div>

          <div className="space-y-1">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-28 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
