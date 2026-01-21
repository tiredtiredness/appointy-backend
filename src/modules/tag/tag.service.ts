import { prisma } from "@/configs/db";

import { CreateTagDto, UpdateTagDto } from "./tag.dto";

class TagService {
  async getAll() {
    return prisma.tag.findMany();
  }

  async getById(id: string) {
    const tag = await prisma.tag.findUnique({ where: { id } });

    if (!tag) {
      throw new Error("tag not found");
    }

    return tag;
  }

  async findOrCreate(data: CreateTagDto) {
    const tag = await prisma.tag.upsert({
      where: { name: data.name },
      create: { name: data.name },
      update: {},
    });

    return tag;
  }

  async update(id: string, data: UpdateTagDto) {
    return prisma.tag.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.tag.delete({ where: { id } });
  }
}

export const tagService = new TagService();
