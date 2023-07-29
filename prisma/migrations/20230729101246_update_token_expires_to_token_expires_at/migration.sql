/*
  Warnings:

  - You are about to drop the column `tokenExpires` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "tokenExpires",
ADD COLUMN     "tokenExpiresAt" TEXT;
