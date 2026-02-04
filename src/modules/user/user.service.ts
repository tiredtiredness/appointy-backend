import { StatusCodes } from "http-status-codes";

import { prisma } from "@/configs/db";

import { CustomError } from "../../lib/error/error.model";
import { UpdateUserDto } from "./user.dto";

class UserService {
  async getAll() {
    return prisma.user.findMany({ omit: { password: true } });
  }

  async getById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
      include: {
        master: { include: { skills: { include: { tag: true } } } },
        client: { include: { interests: { include: { tag: true } } } },
      },
    });

    if (!user) {
      throw new CustomError({
        message: "User not found",
        status: StatusCodes.NOT_FOUND,
        path: "user.getById",
      });
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    if (!id) {
      throw new CustomError({
        message: "User ID is required",
        status: StatusCodes.BAD_REQUEST,
        path: "user.update",
      });
    }

    const existing = await prisma.user.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new CustomError({
        message: "User not found",
        status: StatusCodes.NOT_FOUND,
        path: "user.update",
      });
    }

    const taken = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }, { phone: data.phone }] },
    });

    if (taken && taken?.id !== id) {
      throw new CustomError({
        message: "User already exists",
        status: StatusCodes.CONFLICT,
        path: "user.update",
      });
    }

    return prisma.user.update({ where: { id }, data, omit: { password: true } });
  }

  async delete(id: string) {
    const existing = await prisma.user.findUnique({ where: { id } });

    if (!existing) {
      throw new CustomError({
        message: "User not found",
        status: StatusCodes.NOT_FOUND,
        path: "user.delete",
      });
    }

    return prisma.user.delete({ where: { id }, omit: { password: true } });
  }
}

export const userService = new UserService();
