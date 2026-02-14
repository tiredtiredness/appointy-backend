/*
  Warnings:

  - A unique constraint covering the columns `[name,type]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('SERVICE_CATEGORY', 'MASTER_SKILL', 'CLIENT_INTEREST');

-- DropIndex
DROP INDEX "Service_categoryId_idx";

-- DropIndex
DROP INDEX "Service_masterId_idx";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "type" "TagType" NOT NULL;

-- CreateTable
CREATE TABLE "_MasterCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MasterCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MasterCategories_B_index" ON "_MasterCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_type_key" ON "Tag"("name", "type");

-- AddForeignKey
ALTER TABLE "_MasterCategories" ADD CONSTRAINT "_MasterCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasterCategories" ADD CONSTRAINT "_MasterCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
