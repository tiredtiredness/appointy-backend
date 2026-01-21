import { prisma } from "@/app";

import { CreateTagDto } from "../tag/tag.dto";
import { tagService } from "../tag/tag.service";
import { CreateMasterDto, UpdateMasterDto } from "./master.dto";

class MasterService {
  async getAll() {
    return prisma.master.findMany();
  }

  async getById(id: string) {
    const master = await prisma.master.findUnique({ where: { id } });

    if (!master) {
      throw new Error("Master not found");
    }

    return master;
  }

  async create(data: CreateMasterDto) {
    const oldMaster = await prisma.master.findFirst({
      where: {
        OR: [],
      },
    });

    if (oldMaster) {
      throw new Error("Master already exists");
    }

    const master = await prisma.master.create({ data });

    return master;
  }

  async addSkill(masterId: string, data: CreateTagDto) {
    const tag = await tagService.findOrCreate(data);

    return await prisma.masterSkill.create({ data: { masterId, tagId: tag.id } });
  }

  async update(id: string, data: UpdateMasterDto) {
    return prisma.master.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.master.delete({ where: { id } });
  }
}

export const masterService = new MasterService();
