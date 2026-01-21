import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { masterService } from "./master-skill.service";

class MasterSkillController {
  async add(req: Request, res: Response) {
    const masterId = req.params.id as string;
    const data = req.body;

    const skill = await masterService.create(masterId, data);
    res.status(StatusCodes.CREATED).json(skill);
  }
}

export const masterController = new MasterSkillController();
