import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { breakService } from "./break.service";

class BreakController {
  async getById(req: Request, res: Response) {
    const id = req.params.id as string;

    const scheduleBreak = await breakService.getById(id);

    res.json(scheduleBreak);
  }

  async getByScheduleId(req: Request, res: Response) {
    const scheduleId = req.query.scheduleId as string;

    const scheduleBreak = await breakService.getAllByScheduleId(scheduleId);

    res.json(scheduleBreak);
  }

  async create(req: Request, res: Response) {
    const body = req.body;

    const scheduleBreak = await breakService.create(body);

    res.status(StatusCodes.CREATED).json(scheduleBreak);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const body = req.body;

    const scheduleBreak = await breakService.update(id, body);

    res.json(scheduleBreak);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id as string;

    const scheduleBreak = await breakService.delete(id);

    res.json(scheduleBreak);
  }
}

export const breakController = new BreakController();
