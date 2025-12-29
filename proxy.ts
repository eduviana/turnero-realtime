import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/prisma";

import { ROLE_HIERARCHY } from "@/lib/roles/role-hierarchy";
import { ROUTE_PERMISSIONS } from "@/lib/roles/route-permissions";
import { auditService } from "./lib/audit/auditService";
import { AuditAction, AuditEntity, AuditEventType } from "./generated/prisma/enums";



// Rutas totalmente públicas (bypass total)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/api/users/sync",
  "/api/sessions(.*)", // webhooks
  "/ingreso-afiliado(.*)",

  // Afiliados (solo lo público)
  "/api/affiliate/find-by-dni(.*)",

  // Otros públicos
  "/api/services(.*)",
  "/api/tickets/create",
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // Rutas públicas → sin auth, sin auditoría, sin permisos
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Autenticación
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  //
  // AUTORIZACIÓN
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
      eventType: AuditEventType.SECURITY,
      action: AuditAction.FORBIDDEN_ACCESS,
      entity: AuditEntity.SYSTEM,

      actorId: currentUser.id,
      actorRole: currentUser.role,

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