import { Request, Response } from "express";

import { CreateServiceDto, UpdateServiceDto } from "./service.dto";
import { serviceService } from "./service.service";
import { StatusCodes } from "http-status-codes";

class ServiceController {
  async getAll(req: Request, res: Response) {
    const userId = req.user?.id as string;

    const services = await serviceService.getAll(userId);

    res.json(services);
  }

  async getById(req: Request, res: Response) {
    const id = req.params.id as string;

    const service = await serviceService.getByServiceId(id);

    res.json(service);
  }

  async create(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const data: CreateServiceDto = req.body;

    const service = await serviceService.create(userId, data);

    res.status(StatusCodes.CREATED).json(service);
  }

  async update(req: Request, res: Response) {
    const id = req.params?.id as string;

    const data: UpdateServiceDto = req.body;
    const service = await serviceService.update(id, data);
    res.json(service);
  }

  async delete(req: Request, res: Response) {
    const id = req.params?.id as string;

    const service = await serviceService.delete(id);

    res.json(service);
  }
}

export const serviceController = new ServiceController();
