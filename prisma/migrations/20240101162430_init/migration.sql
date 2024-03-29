/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `deletedAt` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "updatedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
