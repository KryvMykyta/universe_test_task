/*
  Warnings:

  - Changed the type of `status` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('SUBSCRIBED', 'UNSUBSCRIBED');

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "deletedAt" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "EmailStatus" NOT NULL;
