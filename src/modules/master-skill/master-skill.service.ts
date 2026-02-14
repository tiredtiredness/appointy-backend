import { StatusCodes } from "http-status-codes";

import { prisma } from "@/configs/db";
import { CustomError } from "@/lib/error/error.model";

import { CreateTagDto } from "../tag/tag.dto";
import { tagService } from "../tag/tag.service";

class MasterSkillService {
  async create(userId: string, data: CreateTagDto) {
    const master = await prisma.master.findUnique({ where: { userId } });

    if (!master) {
      throw new CustomError({
        message: "Master not found",
        status: StatusCodes.NOT_FOUND,
        path: "masterSkill.create",
      });
    }

    const tag = await tagService.findOrCreate(data);

    return await prisma.masterSkill.create({ data: { masterId: master.id, tagId: tag.id } });
  }
}

export const masterSkillService = new MasterSkillService();
