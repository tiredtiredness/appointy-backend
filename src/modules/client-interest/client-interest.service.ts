import { StatusCodes } from "http-status-codes";

import { prisma } from "@/configs/db";
import { CustomError } from "@/lib/error/error.model";

import { CreateTagDto } from "../tag/tag.dto";
import { tagService } from "../tag/tag.service";

class ClientInterestService {
  async create(userId: string, data: CreateTagDto) {
    const client = await prisma.client.findUnique({ where: { userId } });

    if (!client) {
      throw new CustomError({
        message: "Client not found",
        status: StatusCodes.NOT_FOUND,
        path: "clientInterest.create",
      });
    }

    const tag = await tagService.findOrCreate(data);

    return await prisma.clientInterest.create({ data: { clientId: client.id, tagId: tag.id } });
  }
}

export const clientInterestService = new ClientInterestService();
