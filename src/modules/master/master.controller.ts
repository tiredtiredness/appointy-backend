import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CreateMasterDto, UpdateMasterDto } from "./master.dto";
import { masterService } from "./master.service";

class MasterController {
  async getAll(req: Request, res: Response) {
    const masters = await masterService.getAll();

    res.json(masters);
  }

  async getByUserId(req: Request, res: Response) {
    const id = req.user?.id as string;

    const master = await masterService.getByUserId(id);

    res.json(master);
  }

  async getServiceCategories(req: Request, res: Response) {
    const userId = req.user?.id as string;

    const categories = await masterService.getMasterCategories(userId);

    res.json(categories);
  }

  async create(req: Request, res: Response) {
    const data: CreateMasterDto = req.body;
    const id = req.user?.id as string;

    const master = await masterService.create(id, data);

    res.status(StatusCodes.CREATED).json(master);
  }

  async addSkill(req: Request, res: Response) {
    const masterId = req.user?.id as string;
    const data = req.body;

    const skill = await masterService.create(masterId, data);

    res.status(StatusCodes.CREATED).json(skill);
  }

  async update(req: Request, res: Response) {
    const id = req.user?.id as string;
    const data: UpdateMasterDto = req.body;

    const master = await masterService.update(id, data);

    res.json(master);
  }

  async delete(req: Request, res: Response) {
    const id = req.user?.id as string;

    const master = await masterService.delete(id);

    res.json(master);
  }
}

export const masterController = new MasterController();
