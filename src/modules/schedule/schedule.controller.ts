import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { scheduleService } from "./schedule.service";

class ScheduleController {
  async getById(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const id = req.params?.id as string;

    const schedule = await scheduleService.getById(userId, id);

    res.json(schedule);
  }

  async getByDate(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const startTime = req.query?.startTime as Date | undefined;
    const endTime = req.query?.endTime as Date | undefined;

    const schedule = await scheduleService.getByDate(userId, { startTime, endTime });

    res.json(schedule);
  }

  async create(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const body = req.body;

    const schedule = await scheduleService.create(userId, body);

    res.status(StatusCodes.CREATED).json(schedule);
  }

  async update(req: Request, res: Response) {
    const id = req.params?.id as string;
    const body = req.body;

    const schedule = await scheduleService.update(id, body);

    res.json(schedule);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id as string;

    const schedule = await scheduleService.delete(id);

    res.json(schedule);
  }
}

export const scheduleController = new ScheduleController();
