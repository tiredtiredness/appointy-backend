import { Router } from "express";

import { tagController } from "./tag.controller";

export const tagRouter = Router();

tagRouter.get("/", tagController.getAll);
tagRouter.get("/:id", tagController.getById);
tagRouter.post("/", tagController.create);
tagRouter.put("/:id", tagController.update);
tagRouter.delete("/:id", tagController.delete);
