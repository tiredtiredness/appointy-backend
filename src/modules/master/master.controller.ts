import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CreateMasterDto, UpdateMasterDto } from "./master.dto";
import { masterService } from "./master.service";

class MasterController {
  async getAll(req: Request, res: Response) {
    const masters = await masterService.getAll();
    res.json(masters);
  }

  async getById(req: Request, res: Response) {
    const id = req.params.id as string;
    const master = await masterService.getById(id);
    res.json(master);
  }

  async create(req: Request, res: Response) {
    const data: CreateMasterDto = req.body;
    const master = await masterService.create(data);
    res.json(master);
  }

  async addSkill(req: Request, res: Response) {
    const masterId = req.params.id as string;
    const data = req.body;

    const skill = await masterService.addSkill(masterId, data);
    res.status(StatusCodes.CREATED).json(skill);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    if (!id) {
      res.status(404).json({ message: "Master not found" });
      return;
    }

    const data: UpdateMasterDto = req.body;
    const master = await masterService.update(id, data);
    res.json(master);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    const master = await masterService.delete(id);
    res.json(master);
  }
}

export const masterController = new MasterController();
