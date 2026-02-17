import { endOfDay, isBefore, startOfDay } from "date-fns";
import { StatusCodes } from "http-status-codes";

import { prisma } from "@/configs/db";
import { CustomError } from "@/lib/error/error.model";

import { CreateScheduleDto, UpdateScheduleDto } from "./schedule.dto";

class ScheduleService {
  async getById(userId: string, id: string) {
    const master = await prisma.master.findUnique({ where: { userId } });

    if (!master) {
      throw new CustomError({
        message: "Master not found",
        status: StatusCodes.NOT_FOUND,
        path: "schedule.get",
      });
    }

    const schedule = await prisma.schedule.findUnique({
      where: {
        id,
        masterId: master.id,
      },
      include: { breaks: true },
    });

    if (!schedule) {
      throw new CustomError({
        message: "Schedule not found",
        status: StatusCodes.NOT_FOUND,
        path: "schedule.get",
      });
    }

    return schedule;
  }

  async getByDate(userId: string, { startTime, endTime }: { startTime?: Date; endTime?: Date }) {
    const master = await prisma.master.findUnique({ where: { userId } });

    if (!master) {
      throw new CustomError({
        message: "Master not found",
        status: StatusCodes.NOT_FOUND,
        path: "schedule.get",
      });
    }

    if (!startTime && !endTime) {
      throw new CustomError({
        message: "Wrong date or time",
        status: StatusCodes.BAD_REQUEST,
        path: "schedule.get",
      });
    }

    const start = startTime ?? startOfDay(endTime!);
    const end = endTime ?? endOfDay(startTime!);

    return await prisma.schedule.findMany({
      where: {
        masterId: master.id,
        startTime: {
          gte: start,
          lt: end,
        },
      },
      include: { breaks: true },
    });
  }

  async create(userId: string, data: CreateScheduleDto) {
    const master = await prisma.master.findUnique({ where: { userId } });

    if (!master) {
      throw new CustomError({
        message: "Master not found",
        status: StatusCodes.NOT_FOUND,
        path: "schedule.create",
      });
    }

    const { startTime, endTime } = data;

    const dayStart = startOfDay(startTime);
    const dayEnd = endOfDay(startTime);

    const existing = await prisma.schedule.findFirst({
      where: { startTime: { gte: dayStart.toISOString(), lt: dayEnd.toISOString() } },
    });

    if (existing) {
      throw new CustomError({
        message: "Schedule already exists",
        status: StatusCodes.CONFLICT,
        path: "schedule.create",
      });
    }

    // TODO: ADD SAME DAY CHECK

    return await prisma.schedule.create({ data: { masterId: master.id, startTime, endTime } });
  }

  async update(id: string, data: UpdateScheduleDto) {
    if (!id) {
      throw new CustomError({
        message: "Schedule not found",
        status: StatusCodes.NOT_FOUND,
        path: "schedule.update",
      });
    }

    const existing = await prisma.schedule.findUnique({ where: { id } });

    if (!existing) {
      throw new CustomError({
        message: "Schedule not found",
        status: StatusCodes.NOT_FOUND,
        path: "schedule.update",
      });
    }

    // TODO: ADD SAME DAY CHECK

    // TODO: CHECK IF HAS APPOINTMENTS

    const { startTime, endTime } = data;

    const start = startTime ?? existing.startTime;
    const end = endTime ?? existing.endTime;

    if (isBefore(end, start)) {
      throw new CustomError({
        message: "End can't be before start",
        status: StatusCodes.CONFLICT,
        path: "schedule.update",
      });
    }

    return await prisma.schedule.update({
      where: { id },
      data,
      include: { breaks: true },
    });
  }

  async delete(id: string) {
    const existing = await prisma.schedule.findUnique({ where: { id } });

    if (!existing) {
      throw new CustomError({
        message: "Schedule not found",
        status: StatusCodes.NOT_FOUND,
        path: "schedule.update",
      });
    }

    // TODO: CHECK IF HAS APPOINTMENTS

    return await prisma.schedule.delete({ where: { id } });
  }
}

export const scheduleService = new ScheduleService();
