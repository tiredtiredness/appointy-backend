import { StatusCodes } from "http-status-codes";

import { prisma } from "@/configs/db";
import { CustomError } from "@/lib/error/error.model";

import { CreateClientDto, UpdateClientDto } from "./client.dto";

class ClientService {
  async getAll() {
    return prisma.client.findMany();
  }

  async getById(userId: string) {
    const client = await prisma.client.findUnique({
      where: { userId },
      include: { interests: { include: { tag: true } } },
    });

    if (!client) {
      throw new CustomError({
        message: "Client not found",
        status: StatusCodes.NOT_FOUND,
        path: "client.get",
      });
    }

    return client;
  }

  async create(userId: string, data: CreateClientDto) {
    const oldClient = await prisma.client.findUnique({
      where: { userId },
    });

    if (oldClient) {
      throw new CustomError({
        message: "Client already exists",
        status: StatusCodes.NOT_FOUND,
        path: "client.create",
      });
    }

    const client = await prisma.client.create({ data: { ...data, userId } });

    return client;
  }

  async update(userId: string, data: UpdateClientDto) {
    const existing = await prisma.client.findUnique({ where: { userId } });

    if (!existing) {
      throw new CustomError({
        message: "Client not found",
        status: StatusCodes.NOT_FOUND,
        path: "client.update",
      });
    }
    return prisma.client.update({
      where: { userId },
      data,
      include: { interests: { include: { tag: true } } },
    });
  }

  async delete(userId: string) {
    const existing = await prisma.client.findUnique({ where: { userId } });

    if (!existing) {
      throw new CustomError({
        message: "Client not found",
        status: StatusCodes.NOT_FOUND,
        path: "client.delete",
      });
    }

    return prisma.client.delete({ where: { userId } });
  }
}

export const clientService = new ClientService();
