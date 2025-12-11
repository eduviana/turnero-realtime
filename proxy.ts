// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { db } from "@/lib/db/prisma";
// import { ROLE_HIERARCHY } from "@/lib/roles/role-hierarchy";
// import { ROUTE_PERMISSIONS } from "@/lib/roles/route-permissions";

// // Rutas públicas (sin login)
// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/sign-in(.*)",
//   "/api/users/sync",
//   "/ingreso-afiliado(.*)",
//   "/api/affiliate(.*)",
//   "/api/services(.*)",
//   "/api/tickets/create",
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   const { userId } = await auth();
//   const pathname = req.nextUrl.pathname;

//   if (isPublicRoute(req)) {
//     return;
//   }

//   await auth.protect();

//   if (!userId) return;

//   const matchedPermission = Object.entries(ROUTE_PERMISSIONS).find(([prefix]) =>
//     pathname.startsWith(prefix)
//   );

//   if (!matchedPermission) return;

//   const [, requiredRole] = matchedPermission;

//   const currentUser = await db.user.findUnique({
//     where: { clerkId: userId },
//     select: { role: true },
//   });

//   if (!currentUser) {
//     return new Response("Usuario no encontrado", { status: 403 });
//   }

//   const userLevel = ROLE_HIERARCHY[currentUser.role];
//   const requiredLevel = ROLE_HIERARCHY[requiredRole];

//   if (userLevel < requiredLevel) {
//     return Response.redirect(new URL("/dashboard", req.url));
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { db } from "@/lib/db/prisma";
import { ROLE_HIERARCHY } from "@/lib/roles/role-hierarchy";
import { ROUTE_PERMISSIONS } from "@/lib/roles/route-permissions";
import { auditService } from "./lib/audit/auditService";
import { EventTypes } from "./lib/audit/eventTypes";
import { AuditActions } from "./lib/audit/auditActions";
import { NextResponse } from "next/server";

// Rutas totalmente públicas (bypass total)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/api/users/sync",
  "/api/sessions(.*)", // <-- webhook fuera del middleware
  "/ingreso-afiliado(.*)",
  "/api/affiliate(.*)",
  "/api/services(.*)",
  "/api/tickets/create",
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // Webhooks y rutas públicas → no autenticamos, no auditamos, no control de permisos
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Forzar login en rutas privadas
  // const { userId } = await auth.protect();
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  //
  // CONTROL DE PERMISOS (AUTORIZACIÓN)
  //

  const matchedPermission = Object.entries(ROUTE_PERMISSIONS).find(([prefix]) =>
    pathname.startsWith(prefix)
  );

  if (!matchedPermission) {
    return NextResponse.next();
  }

  const [, requiredRole] = matchedPermission;

  const currentUser = await db.user.findUnique({
    where: { clerkId: userId },
    select: { id: true, role: true },
  });

  if (!currentUser) {
    return new Response("Usuario no encontrado", { status: 403 });
  }

  const userLevel = ROLE_HIERARCHY[currentUser.role];
  const requiredLevel = ROLE_HIERARCHY[requiredRole];

  if (userLevel < requiredLevel) {
    await auditService.record({
      eventType: EventTypes.SECURITY,
      action: AuditActions.SECURITY_FORBIDDEN_ACCESS,
      actorId: currentUser.id,
      metadata: {
        requiredRole,
        userRole: currentUser.role,
        attemptedPath: pathname,
      },
      ip: req.headers.get("x-forwarded-for"),
      userAgent: req.headers.get("user-agent"),
    });

    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
