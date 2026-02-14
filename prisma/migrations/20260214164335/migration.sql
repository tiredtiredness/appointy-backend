/*
  Warnings:

  - A unique constraint covering the columns `[startTime]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[endTime]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Schedule_startTime_key" ON "Schedule"("startTime");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_endTime_key" ON "Schedule"("endTime");
