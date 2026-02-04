import { StatusCodes } from "http-status-codes";

import { prisma } from "@/configs/db";
import { CustomError } from "@/lib/error/error.model";

import { CreateServiceDto, UpdateServiceDto } from "./service.dto";

class ServiceService {
  async getAll(userId: string) {
    const master = await prisma.master.findUnique({ where: { userId } });

    if (!master) {
      throw new CustomError({
        message: "Master not found",
        status: StatusCodes.NOT_FOUND,
        path: "service.get",
      });
    }

    return prisma.service.findMany({ where: { masterId: master.id }, include: { category: true } });
  }

  async getByServiceId(id: string) {
    const service = await prisma.service.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!service) {
      throw new CustomError({
        message: "Service not found",
        status: StatusCodes.NOT_FOUND,
        path: "service.get",
      });
    }

    return service;
  }

  async create(userId: string, data: CreateServiceDto) {
    const master = await prisma.master.findUnique({ where: { userId } });

    if (!master) {
      throw new CustomError({
        message: "Master not found",
        status: StatusCodes.NOT_FOUND,
        path: "service.create",
      });
    }

    const service = await prisma.service.create({ data: { ...data, masterId: master.id } });

    return service;
  }

  async update(id: string, data: UpdateServiceDto) {
    const existing = await prisma.service.findUnique({ where: { id } });

    if (!existing) {
      throw new CustomError({
        message: "Service not found",
        status: StatusCodes.NOT_FOUND,
        path: "service.update",
      });
    }

    return prisma.service.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const existing = await prisma.service.findUnique({ where: { id } });

    if (!existing) {
      throw new CustomError({
        message: "Service not found",
        status: StatusCodes.NOT_FOUND,
        path: "service.delete",
      });
    }

    return prisma.service.delete({ where: { id } });
  }
}

export const serviceService = new ServiceService();
