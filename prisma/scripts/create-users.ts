import "dotenv/config";
import { hash } from "bcryptjs";
import { db } from "@/lib/db/prisma";

const PASSWORD = "Password123!";

async function main() {
  console.log("Seeding users...");

  const hashedPassword = await hash(PASSWORD, 12);

  const users = [
    {
      email: "admin@test.com",
      name: "Admin Principal",
      firstName: "Admin",
      lastName: "Principal",
      role: "ADMIN" as const,
    },
    {
      email: "supervisor@test.com",
      name: "Supervisor General",
      firstName: "Supervisor",
      lastName: "General",
      role: "SUPERVISOR" as const,
    },
    ...Array.from({ length: 8 }, (_, i) => ({
      email: `operador${i + 1}@test.com`,
      name: `Operador ${i + 1}`,
      firstName: `Operador`,
      lastName: `${i + 1}`,
      role: "OPERATOR" as const,
    })),
  ];

  for (const user of users) {
    await db.user.upsert({
      where: { email: user.email },
      update: {
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        role: user.role,
      },
      create: {
        email: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        role: user.role,
      },
    });
    console.log(`  ✓ ${user.email} (${user.role})`);
  }

  console.log("\nSeeding complete.");
  console.log("\nCredentials for all users:");
  console.log("  Email:    <email above>");
  console.log("  Password: Password123!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
