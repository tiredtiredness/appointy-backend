import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { userService } from "./user.service";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;
    try {
      const user = await userService.getById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateUserDto = req.body;
      const user = await userService.create(data);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data: UpdateUserDto = req.body;
      const user = await userService.update(id, data);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await userService.delete(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
