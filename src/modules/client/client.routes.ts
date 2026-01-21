import { Router } from "express";

import { clientController } from "./client.controller";

export const clientRouter = Router();

clientRouter.get("/", clientController.getAll);
clientRouter.get("/:id", clientController.getById);
clientRouter.post("/", clientController.create);
clientRouter.put("/:id", clientController.update);
clientRouter.delete("/:id", clientController.delete);
