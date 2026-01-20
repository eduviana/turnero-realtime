import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { auditService } from "@/lib/audit/auditService";
import { db } from "@/lib/db/prisma";
import {
  AuditAction,
  AuditEntity,
  AuditEventType,
} from "@/generated/prisma/enums";

export async function POST(req: Request) {
  const svixSecret = process.env.CLERK_WEBHOOK_SECRET_SESSION;
  if (!svixSecret) {
    console.error("Missing CLERK_WEBHOOK_SECRET_SESSION");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

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

  const clerkUserId: string | undefined = data?.user_id;
  if (!clerkUserId) {
    return NextResponse.json({ ok: true });
  }

  const user = await db.user.findUnique({
    where: { clerkId: clerkUserId },
    select: { id: true, role: true },
  });

  if (!user) {
    return NextResponse.json({ ok: true });
  }

  /**
   * LOGIN
   * Se considera una actividad válida.
   * Inicializa lastActivityAt.
   */
  if (type === "session.created") {
    const now = new Date();

    await db.userStatus.upsert({
      where: { userId: user.id },
      update: {
        lastActivityAt: now,
      },
      create: {
        userId: user.id,
        lastActivityAt: now,
      },
    });

    await auditService.record({
      eventType: AuditEventType.SYSTEM,
      action: AuditAction.LOGIN,
      entity: AuditEntity.USER,
      entityId: user.id,

      actorId: user.id,
      actorRole: user.role,

      metadata: {
        clerkUserId,
        sessionId: data.id,
      },

      ip: req.headers.get("x-forwarded-for"),
      userAgent: req.headers.get("user-agent"),
    });

    return NextResponse.json({ ok: true });
  }

  /**
   * LOGOUT
   * NO se modifica UserStatus.
   * La presencia se deriva únicamente de lastActivityAt.
   */
  const logoutEvents = ["session.ended", "session.removed", "session.revoked"];

  if (logoutEvents.includes(type)) {
    await auditService.record({
      eventType: AuditEventType.SYSTEM,
      action: AuditAction.LOGOUT,
      entity: AuditEntity.USER,
      entityId: user.id,

      actorId: user.id,
      actorRole: user.role,

      metadata: {
        clerkUserId,
        sessionId: data.id,
        event: type,
      },

      ip: req.headers.get("x-forwarded-for"),
      userAgent: req.headers.get("user-agent"),
    });

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
