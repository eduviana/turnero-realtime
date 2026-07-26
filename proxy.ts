import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/prisma";

import { ROLE_HIERARCHY } from "@/lib/roles/role-hierarchy";
import { ROUTE_PERMISSIONS } from "@/lib/roles/route-permissions";
import { auditService } from "./lib/audit/auditService";
import {
  AuditAction,
  AuditEntity,
  AuditEventType,
} from "./generated/prisma/enums";

const PUBLIC_ROUTES = [
  "/",
  "/sign-in",
  "/sign-in/",
  "/api/auth",
  "/ingreso-afiliado",
  "/pantalla-turnos",
  "/api/turn-screen",
  "/api/affiliate/find-by-dni",
  "/api/services",
  "/api/tickets/create",
];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

function debug(...args: unknown[]) {
  console.log(`[MIDDLEWARE ${new Date().toISOString()}]`, ...args);
}

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const token = req.nextauth.token;

    debug(`request`, { pathname, hasToken: !!token, hasEmail: !!token?.email, email: token?.email });

    if (pathname === "/dashboard") {
      if (!token?.email) {
        debug(`redirect /dashboard -> /sign-in: no email in token`, { token });
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      let user: { role: string } | null;
      try {
        user = await db.user.findUnique({
          where: { email: token.email },
          select: { role: true },
        });
      } catch (err) {
        debug(`redirect /dashboard -> /sign-in: db error`, { error: String(err) });
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      if (!user) {
        debug(`redirect /dashboard -> /sign-in: user not found by email`, { email: token.email });
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      switch (user.role) {
        case "ADMIN":
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        case "SUPERVISOR":
          return NextResponse.redirect(new URL("/supervisor/dashboard", req.url));
        case "OPERATOR":
          return NextResponse.redirect(new URL("/operator/dashboard", req.url));
        default:
          debug(`redirect /dashboard -> /sign-in: unknown role`, { role: user.role });
          return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }

    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    if (!token?.email) {
      debug(`redirect to /sign-in: no email in token`, { pathname, token });
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const matchedPermission = Object.entries(ROUTE_PERMISSIONS).find(([prefix]) =>
      pathname.startsWith(prefix),
    );

    if (!matchedPermission) {
      return NextResponse.next();
    }

    const [, requiredRole] = matchedPermission;

    let currentUser: { id: string; role: string } | null;
    try {
      currentUser = await db.user.findUnique({
        where: { email: token.email },
        select: { id: true, role: true },
      });
    } catch (err) {
      debug(`redirect to /sign-in: db error on permission check`, { error: String(err), pathname });
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (!currentUser) {
      debug(`403: user not found by email`, { email: token.email, pathname });
      return new Response("Usuario no encontrado", { status: 403 });
    }

    const userLevel = ROLE_HIERARCHY[currentUser.role as keyof typeof ROLE_HIERARCHY];
    const requiredLevel = ROLE_HIERARCHY[requiredRole];

    if (userLevel < requiredLevel) {
      debug(`redirect to /sign-in: role insufficient`, {
        pathname,
        userRole: currentUser.role,
        requiredRole,
      });

      await auditService.record({
        eventType: AuditEventType.SECURITY,
        action: AuditAction.FORBIDDEN_ACCESS,
        entity: AuditEntity.SYSTEM,

        actorId: currentUser.id,
        actorRole: currentUser.role as any,

        metadata: {
          requiredRole,
          userRole: currentUser.role,
          attemptedPath: pathname,
        },

        ip: req.headers.get("x-forwarded-for"),
        userAgent: req.headers.get("user-agent"),
      });

      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        if (isPublicRoute(pathname)) {
          return true;
        }

        if (!token) {
          debug(`authorized=false: no token`, { pathname });
          return false;
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
