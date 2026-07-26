import "dotenv/config";
import { db } from "@/lib/db/prisma";
import { TicketStatus } from "@/generated/prisma/enums";

async function main() {
  console.log("Seeding tickets for today...");

  const services = await db.service.findMany({ orderBy: { code: "asc" } });
  const affiliates = await db.affiliate.findMany();

  if (affiliates.length === 0) {
    console.error("No affiliates found. Run create-affiliates.ts first.");
    process.exit(1);
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);

  const configs: { code: string; count: number }[] = [
    { code: "AC", count: 1 },
    { code: "PF", count: 1 },
    { code: "AF", count: 1 },
    { code: "FM", count: 8 },
    { code: "FG", count: 8 },
  ];

  let idx = 0;

  for (const config of configs) {
    const service = services.find((s) => s.code === config.code);
    if (!service) {
      console.warn(`Service ${config.code} not found, skipping`);
      continue;
    }

    for (let i = 0; i < config.count; i++) {
      const number = service.currentIndex + 1 + i;
      const ticketCode = `${service.code}-${number}`;
      const affiliate = affiliates[idx % affiliates.length];
      idx++;

      const isFirstHalf = i < config.count / 2;

      const createdAt = new Date(todayStart.getTime() + idx * 45 * 60 * 1000);

      let status: TicketStatus;
      if (isFirstHalf) {
        status = TicketStatus.COMPLETED;
      } else {
        const remainder = i % 3;
        if (remainder === 0) status = TicketStatus.PENDING;
        else if (remainder === 1) status = TicketStatus.CALLED;
        else status = TicketStatus.IN_PROGRESS;
      }

      const completedAt = status === TicketStatus.COMPLETED ? new Date(createdAt.getTime() + 15 * 60 * 1000) : undefined;
      const wasCalled = status === TicketStatus.CALLED || status === TicketStatus.IN_PROGRESS;
      const calledAt = wasCalled
        ? new Date(createdAt.getTime() + 5 * 60 * 1000)
        : undefined;
      const startedAt = status === TicketStatus.IN_PROGRESS
        ? new Date(createdAt.getTime() + 8 * 60 * 1000)
        : undefined;

      await db.ticket.create({
        data: {
          serviceId: service.id,
          affiliateId: affiliate.id,
          number,
          code: ticketCode,
          status,
          createdAt,
          calledAt,
          startedAt,
          completedAt,
        },
      });

      console.log(`  Created ${ticketCode} (${status}) for ${affiliate.firstName} ${affiliate.lastName}`);
    }

    const newIndex = service.currentIndex + config.count;
    await db.service.update({
      where: { id: service.id },
      data: { currentIndex: newIndex },
    });
  }

  console.log("Done. 19 tickets created for today.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
