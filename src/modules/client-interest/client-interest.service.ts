import { prisma } from "@/app";

import { CreateTagDto } from "../tag/tag.dto";
import { tagService } from "../tag/tag.service";

class ClientInterestService {
  async create(clientId: string, data: CreateTagDto) {
    const tag = await tagService.findOrCreate(data);

    return await prisma.clientInterest.create({ data: { clientId, tagId: tag.id } });
  }
}

export const clientInterestService = new ClientInterestService();
