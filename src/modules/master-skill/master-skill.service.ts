import { prisma } from "@/app";

import { CreateTagDto } from "../tag/tag.dto";
import { tagService } from "../tag/tag.service";

class MasterSkillService {
  async create(masterId: string, data: CreateTagDto) {
    const tag = await tagService.findOrCreate(data);

    return await prisma.masterSkill.create({ data: { masterId, tagId: tag.id } });
  }
}

export const masterService = new MasterSkillService();
