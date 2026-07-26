-- Drop clerkId unique index and column
DROP INDEX IF EXISTS "User_clerkId_key";
ALTER TABLE "User" DROP COLUMN "clerkId";

-- Add name and password columns
ALTER TABLE "User" ADD COLUMN "name" TEXT;
ALTER TABLE "User" ADD COLUMN "password" TEXT;

-- Make email nullable (matching schema: String? instead of String)
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;
