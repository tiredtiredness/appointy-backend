/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ClientInterest` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ClientInterest` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `MasterSkill` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `MasterSkill` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClientInterest" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "MasterSkill" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "middleName" DROP NOT NULL;
