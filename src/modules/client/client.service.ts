import { prisma } from "@/configs/db";

import { CreateTagDto } from "../tag/tag.dto";
import { tagService } from "../tag/tag.service";
import { CreateClientDto, UpdateClientDto } from "./client.dto";

class ClientService {
  async getAll() {
    return prisma.client.findMany();
  }

  async getById(id: string) {
    const client = await prisma.client.findUnique({ where: { id } });

    if (!client) {
      throw new Error("Client not found");
    }

    return client;
  }

  async create(data: CreateClientDto) {
    const oldClient = await prisma.client.findFirst({
      where: { OR: [] },
    });

    if (oldClient) {
      throw new Error("Client already exists");
    }

    const client = await prisma.client.create({ data });

    return client;
  }

  async addSkill(clientId: string, data: CreateTagDto) {
    const tag = await tagService.findOrCreate(data);

    return await prisma.clientInterest.create({ data: { clientId, tagId: tag.id } });
  }

  async update(id: string, data: UpdateClientDto) {
    return prisma.client.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.client.delete({ where: { id } });
  }
}

export const clientService = new ClientService();
