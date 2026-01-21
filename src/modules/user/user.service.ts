import { StatusCodes } from "http-status-codes";

import { prisma } from "@/app";

import { CustomError } from "../../shared/error/error.model";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

class UserService {
  async getAll() {
    return prisma.user.findMany();
  }

  async getById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new CustomError({
        message: "User not found",
        status: StatusCodes.NOT_FOUND,
        path: "user.getById",
      });
    }

    return user;
  }

  async create(data: CreateUserDto) {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ username: data.username }, { email: data.username }, { phone: data.phone }] },
    });

    if (existing) {
      throw new CustomError({
        message: "User already exists",
        status: StatusCodes.CONFLICT,
        path: "user.create",
      });
    }

    const user = await prisma.user.create({ data });

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

    return prisma.user.update({ where: { id }, data });
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

    return prisma.user.delete({ where: { id } });
  }
}

export const userService = new UserService();
