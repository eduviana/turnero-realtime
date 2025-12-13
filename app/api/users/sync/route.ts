// import { headers } from "next/headers";
// import { Webhook } from "svix";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/db/prisma";

// type ClerkWebhookEvent = {
//   object: string;
//   type: string;
//   data: any;
// };

// export async function POST(req: Request) {
//   const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
//   if (!CLERK_WEBHOOK_SECRET) {
//     throw new Error("Missing CLERK_WEBHOOK_SECRET");
//   }

//   // Clerk envía el body como raw text
//   const payload = await req.text();
//   const hdrs = await headers();
//   const svixId = hdrs.get("svix-id");
//   const svixTimestamp = hdrs.get("svix-timestamp");
//   const svixSignature = hdrs.get("svix-signature");

//   if (!svixId || !svixTimestamp || !svixSignature) {
//     return new Response("Missing svix headers", { status: 400 });
//   }

//   const wh = new Webhook(CLERK_WEBHOOK_SECRET);

//   let event: ClerkWebhookEvent;
//   try {
//     event = wh.verify(payload, {
//       "svix-id": svixId,
//       "svix-timestamp": svixTimestamp,
//       "svix-signature": svixSignature,
//     }) as ClerkWebhookEvent;
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err);
//     return new Response("Invalid signature", { status: 400 });
//   }

//   const { type, data } = event;

//   if (type === "user.created" || type === "user.updated") {
//     const clerkId = data.id;
//     const firstName = data.first_name ?? null;
//     const lastName = data.last_name ?? null;
//     const profileImage =
//       data.image_url && data.image_url.length > 0 ? data.image_url : null;

//     // Obtener email principal de manera segura
//     const primaryEmailId = data.primary_email_address_id ?? null;

//     const email = primaryEmailId
//       ? data.email_addresses?.find((e: any) => e.id === primaryEmailId)
//           ?.email_address ?? null
//       : null;

//     await prisma.user.upsert({
//       where: { clerkId },
//       create: {
//         clerkId,
//         email,
//         firstName,
//         lastName,
//         profileImage,
//         role: "OPERATOR",
//       },
//       update: {
//         email,
//         firstName,
//         lastName,
//         profileImage,
//         updatedAt: new Date(),
//       },
//     });
//   }

//   if (type === "user.deleted") {
//     const clerkId = data.id;

//     await prisma.user.updateMany({
//       where: { clerkId },
//       data: {
//         deletedAt: new Date(),
//       },
//     });
//   }

//   return new Response("OK", { status: 200 });
// }

import { headers } from "next/headers";
import { Webhook } from "svix";
import { prisma } from "@/lib/db/prisma";

type ClerkEmailAddress = {
  id: string;
  email_address: string;
};

type ClerkUserData = {
  id: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
  primary_email_address_id?: string;
  email_addresses?: ClerkEmailAddress[];
};

type ClerkWebhookEvent = {
  object: "event";
  type: "user.created" | "user.updated" | "user.deleted";
  data: ClerkUserData;
};

export async function POST(req: Request) {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  const payload = await req.text();
  const hdrs = await headers();

  const svixId = hdrs.get("svix-id");
  const svixTimestamp = hdrs.get("svix-timestamp");
  const svixSignature = hdrs.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  let event: ClerkWebhookEvent;

  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const { type, data } = event;

  // USER CREATED / UPDATED
  if (type === "user.created" || type === "user.updated") {
    const clerkId = data.id;

    const email =
      data.primary_email_address_id
        ? data.email_addresses?.find(
            (e) => e.id === data.primary_email_address_id
          )?.email_address ?? null
        : null;

    await prisma.user.upsert({
      where: { clerkId },
      create: {
        clerkId,
        email,
        firstName: data.first_name ?? null,
        lastName: data.last_name ?? null,
        profileImage: data.image_url ?? null,
        role: "OPERATOR",
      },
      update: {
        email,
        firstName: data.first_name ?? null,
        lastName: data.last_name ?? null,
        profileImage: data.image_url ?? null,
      },
    });
  }

  // USER DELETED (soft delete)
  if (type === "user.deleted") {
    try {
      await prisma.user.update({
        where: { clerkId: data.id },
        data: { deletedAt: new Date() },
      });
    } catch (err: any) {
      if (err.code !== "P2025") {
        throw err;
      }
    }
  }

  return new Response("OK", { status: 200 });
}
