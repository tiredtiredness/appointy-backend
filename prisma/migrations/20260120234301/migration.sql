/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Master" ALTER COLUMN "shortBio" DROP NOT NULL,
ALTER COLUMN "longBio" DROP NOT NULL,
ALTER COLUMN "educationBio" DROP NOT NULL,
ALTER COLUMN "workStyleBio" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHash",
ADD COLUMN     "password" TEXT NOT NULL;
