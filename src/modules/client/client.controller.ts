import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CreateClientDto, UpdateClientDto } from "./client.dto";
import { clientService } from "./client.service";

class ClientController {
  async getAll(req: Request, res: Response) {
    const clients = await clientService.getAll();
    res.json(clients);
  }

  async getById(req: Request, res: Response) {
    const id = req.user?.id as string;
    const client = await clientService.getById(id);
    res.json(client);
  }

  async create(req: Request, res: Response) {
    const id = req.user?.id as string;
    const data: CreateClientDto = req.body;

    const client = await clientService.create(id, data);
    res.status(StatusCodes.CREATED).json(client);
  }

  async addInterest(req: Request, res: Response) {
    const clientId = req.user?.id as string;
    const data = req.body;

    const interest = await clientService.create(clientId, data);

    res.status(StatusCodes.CREATED).json(interest);
  }

  async update(req: Request, res: Response) {
    const id = req.user?.id as string;
    const data: UpdateClientDto = req.body;

    const client = await clientService.update(id, data);

    res.json(client);
  }

  async delete(req: Request, res: Response) {
    const id = req.user?.id as string;

    const client = await clientService.delete(id);

    res.json(client);
  }
}

export const clientController = new ClientController();
