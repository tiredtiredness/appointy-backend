import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { clientInterestService } from "./client-interest.service";

class ClientInterestController {
  async addInterest(req: Request, res: Response) {
    const clientId = req.params.id as string;
    const data = req.body;

    const interest = await clientInterestService.create(clientId, data);
    res.status(StatusCodes.CREATED).json(interest);
  }
}

export const clienInteresttController = new ClientInterestController();
