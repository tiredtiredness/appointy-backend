import { Request, Response } from "express";

import { CreateTagDto, UpdateTagDto } from "./tag.dto";
import { tagService } from "./tag.service";

class TagController {
  async getAll(req: Request, res: Response) {
    const tags = await tagService.getAll();
    res.json(tags);
  }

  async getById(req: Request, res: Response) {
    const id = req.params.id;
    const tag = await tagService.getById(id);
    res.json(tag);
  }

  async create(req: Request, res: Response) {
    const data: CreateTagDto = req.body;
    const Tag = await tagService.findOrCreate(data);
    res.json(Tag);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    const data: UpdateTagDto = req.body;
    const tag = await tagService.update(id, data);
    res.json(tag);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const tag = await tagService.delete(id);
    res.json(tag);
  }
}

export const tagController = new TagController();
