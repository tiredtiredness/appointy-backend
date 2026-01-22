import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { clientInterestService } from "./client-interest.service";

class ClientInterestController {
  async add(req: Request, res: Response) {
    const id = req.user?.id as string;
    const data = req.body;

    const interest = await clientInterestService.create(id, data);

    res.status(StatusCodes.CREATED).json(interest);
  }
}

export const clientInterestController = new ClientInterestController();
