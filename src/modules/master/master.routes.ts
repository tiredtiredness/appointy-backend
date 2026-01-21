import { Router } from "express";

import { masterController } from "./master.controller";

export const masterRouter = Router();

masterRouter.get("/", masterController.getAll);
masterRouter.get("/:id", masterController.getById);
masterRouter.post("/", masterController.create);
masterRouter.put("/:id", masterController.update);
masterRouter.delete("/:id", masterController.delete);
