import { StatusCodes } from "http-status-codes";

import { prisma } from "@/configs/db";
import { CustomError } from "@/lib/error/error.model";

import { CreateMasterDto, UpdateMasterDto } from "./master.dto";

class MasterService {
  async getAll() {
    return prisma.master.findMany();
  }

  async getByUserId(userId: string) {
    const master = await prisma.master.findUnique({
      where: { userId },
      include: { skills: { include: { tag: true } }, user: true },
    });

    if (!master) {
      throw new CustomError({
        message: "Master not found",
        status: StatusCodes.NOT_FOUND,
        path: "master.get",
      });
    }

    return master;
  }

  async getMasterCategories(userId: string) {
    const master = await prisma.master.findUnique({
      where: { userId },
      include: { skills: { include: { tag: true } }, user: true },
    });

    if (!master) {
      throw new CustomError({
        message: "Master not found",
        status: StatusCodes.NOT_FOUND,
        path: "master.get",
      });
    }

    const categories = await prisma.tag.findMany({
      where: {
        services: {
          some: {
            masterId: master.id,
          },
        },
      },
    });

    return categories;
  }

  async create(userId: string, data: CreateMasterDto) {
    const oldMaster = await prisma.master.findUnique({
      where: {
        userId,
      },
    });

    if (oldMaster) {
      throw new CustomError({
        message: "Master already exists",
        status: StatusCodes.CONFLICT,
        path: "master.create",
      });
    }

    const master = await prisma.master.create({ data: { ...data, userId } });

    return master;
  }

  async update(userId: string, data: UpdateMasterDto) {
    const existing = await prisma.master.findUnique({ where: { userId } });

    if (!existing) {
      throw new CustomError({
        message: "Master not found",
        status: StatusCodes.NOT_FOUND,
        path: "master.update",
      });
    }

    return prisma.master.update({
      where: { userId },
      data,
      include: { skills: { include: { tag: true } }, user: true },
    });
  }

  async delete(userId: string) {
    const existing = await prisma.master.findUnique({ where: { userId } });

    if (!existing) {
      throw new CustomError({
        message: "Master not found",
        status: StatusCodes.NOT_FOUND,
        path: "master.delete",
      });
    }

    return prisma.master.delete({ where: { userId } });
  }
}

export const masterService = new MasterService();
