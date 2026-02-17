import { isBefore } from "date-fns";
import { StatusCodes } from "http-status-codes";

import { prisma } from "@/configs/db";
import { CustomError } from "@/lib/error/error.model";

import { CreateBreakDto, UpdateBreakDto } from "./break.dto";

class BreakService {
  async getById(id: string) {
    const scheduleBreak = await prisma.break.findUnique({ where: { id } });

    if (!scheduleBreak) {
      throw new CustomError({
        message: "Break not found",
        status: StatusCodes.NOT_FOUND,
        path: "break.get",
      });
    }

    return scheduleBreak;
  }

  async getAllByScheduleId(scheduleId: string) {
    if (!scheduleId) {
      throw new CustomError({
        message: "Schedule not found",
        status: StatusCodes.NOT_FOUND,
        path: "break.get",
      });
    }

    return await prisma.break.findMany({ where: { scheduleId } });
  }

  async create(data: CreateBreakDto) {
    const { scheduleId, startTime, endTime } = data;

    if (isBefore(endTime, startTime)) {
      throw new CustomError({
        message: "End can't be before start",
        status: StatusCodes.CONFLICT,
        path: "break.create",
      });
    }

    const schedule = await prisma.schedule.findUnique({ where: { id: scheduleId } });

    if (!schedule) {
      throw new CustomError({
        message: "Schedule not found",
        status: StatusCodes.NOT_FOUND,
        path: "break.create",
      });
    }

    if (!isBefore(schedule.startTime, startTime) || !isBefore(endTime, schedule.endTime)) {
      throw new CustomError({
        message: "Break must be inside schedule interval",
        status: StatusCodes.CONFLICT,
        path: "break.create",
      });
    }

    const overlappingBreak = await prisma.break.findFirst({
      where: {
        scheduleId,
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
    });

    if (overlappingBreak) {
      throw new CustomError({
        message: "Break overlaps existing break",
        status: StatusCodes.CONFLICT,
        path: "break.create",
      });
    }

    return await prisma.break.create({ data });
  }

  async update(id: string, data: UpdateBreakDto) {
    const existing = await prisma.break.findUnique({ where: { id }, include: { schedule: true } });

    if (!existing) {
      throw new CustomError({
        message: "Schedule break not found",
        status: StatusCodes.NOT_FOUND,
        path: "break.update",
      });
    }

    const { startTime, endTime } = data;

    const start = startTime ?? existing.startTime;
    const end = endTime ?? existing.endTime;

    if (!isBefore(start, end)) {
      throw new CustomError({
        message: "End can't be before start",
        status: StatusCodes.CONFLICT,
        path: "break.update",
      });
    }

    if (
      !isBefore(existing.schedule.startTime, start) ||
      !isBefore(end, existing.schedule.endTime)
    ) {
      throw new CustomError({
        message: "Break must be inside schedule interval",
        status: StatusCodes.CONFLICT,
        path: "break.update",
      });
    }

    const overlappingBreak = await prisma.break.findFirst({
      where: {
        scheduleId: existing.scheduleId,
        id: { not: id },
        startTime: { lt: end },
        endTime: { gt: start },
      },
    });

    if (overlappingBreak) {
      throw new CustomError({
        message: "Break overlaps existing break",
        status: StatusCodes.CONFLICT,
        path: "break.update",
      });
    }

    return await prisma.break.update({ where: { id }, data });
  }

  async delete(id: string) {
    const existing = await prisma.break.findUnique({ where: { id } });

    if (!existing) {
      throw new CustomError({
        message: "Schedule break not found",
        status: StatusCodes.NOT_FOUND,
        path: "break.delete",
      });
    }

    // TODO: CHECK IF HAS APPOINTMENTS

    return prisma.break.delete({ where: { id } });
  }
}

export const breakService = new BreakService();
