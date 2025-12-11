import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { auditService } from "@/lib/audit/auditService";
import { AuditActions } from "@/lib/audit/auditActions";
import { EventTypes } from "@/lib/audit/eventTypes";
import { db } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const svixSecret = process.env.CLERK_WEBHOOK_SECRET_SESSION;
  if (!svixSecret) {
    console.error("Missing CLERK_WEBHOOK_SECRET_SESSION");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  //
  // Clerk webhook envía JSON pero la verificación requiere el raw body
  //
  const payload = await req.text();

  const svixId = req.headers.get("svix-id");
  const svixTs = req.headers.get("svix-timestamp");
  const svixSig = req.headers.get("svix-signature");

  if (!svixId || !svixTs || !svixSig) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const wh = new Webhook(svixSecret);

  let event: any;
  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTs,
      "svix-signature": svixSig,
    });
  } catch (err) {
    console.error("Invalid Clerk/Svix signature:", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { type, data } = event;

  //
  // USER IDENTIFICATION
  //
  const clerkUserId: string | undefined = data?.user_id;
  if (!clerkUserId) {
    console.warn("Received session event without user_id");
    return NextResponse.json({ ok: true });
  }

  // Fetch local user
  const user = await db.user.findUnique({
    where: { clerkId: clerkUserId },
    select: { id: true, role: true },
  });

  //
  // Define actions per role
  //
  const getLoginAction = (role: string) => {
    switch (role) {
      case "ADMIN": return AuditActions.ADMIN_LOGIN;
      case "SUPERVISOR": return AuditActions.SUPERVISOR_LOGIN;
      case "OPERATOR": return AuditActions.OPERATOR_LOGIN;
      default: return undefined;
    }
  };

  const getLogoutAction = (role: string) => {
    switch (role) {
      case "ADMIN": return AuditActions.ADMIN_LOGOUT;
      case "SUPERVISOR": return AuditActions.SUPERVISOR_LOGOUT;
      case "OPERATOR": return AuditActions.OPERATOR_LOGOUT;
      default: return undefined;
    }
  };

  //
  // PROCESS LOGIN
  //
  if (type === "session.created") {
    if (user) {
      const action = getLoginAction(user.role);

      if (action) {
        await auditService.record({
          eventType: EventTypes.SYSTEM,
          action,
          actorId: user.id,
          metadata: {
            clerkUserId,
            sessionId: data.id
          },
          ip: req.headers.get("x-forwarded-for"),
          userAgent: req.headers.get("user-agent"),
        });
      }
    }

    return NextResponse.json({ ok: true });
  }

  //
  // PROCESS LOGOUT EVENTS (solo los habilitados en Clerk)
  //
  const logoutEvents = [
    "session.ended",    // usuario hace logout
    "session.removed",  // otra sesión invalida esta
    "session.revoked",  // revocación manual/administrativa
  ];

  if (logoutEvents.includes(type)) {
    if (user) {
      const action = getLogoutAction(user.role);

      if (action) {
        await auditService.record({
          eventType: EventTypes.SYSTEM,
          action,
          actorId: user.id,
          metadata: {
            clerkUserId,
            sessionId: data.id,
            eventType: type
          },
          ip: req.headers.get("x-forwarded-for"),
          userAgent: req.headers.get("user-agent"),
        });
      }
    }

    return NextResponse.json({ ok: true });
  }

  //
  // Ignore anything else
  //
  return NextResponse.json({ ok: true });
}