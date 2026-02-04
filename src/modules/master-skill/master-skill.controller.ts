import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { masterSkillService } from "./master-skill.service";

class MasterSkillController {
  async add(req: Request, res: Response) {
    const id = req.user?.id as string;
    const data = req.body;

    const skill = await masterSkillService.create(id, data);

    res.status(StatusCodes.CREATED).json(skill);
  }
}

export const masterSkillController = new MasterSkillController();
