import { Router } from "express";

import { authenticate } from "@/utils/authenticate";
import { validate } from "@/utils/validate";

import { serviceController } from "./service.controller";
import { createServiceSchema, updateServiceSchema } from "./service.schema";

export const serviceRouter = Router();

serviceRouter.get("/", authenticate, serviceController.getAll);
serviceRouter.get("/:id", authenticate, serviceController.getById);
serviceRouter.post("/", authenticate, validate(createServiceSchema), serviceController.create);
serviceRouter.put("/:id", authenticate, validate(updateServiceSchema), serviceController.update);
serviceRouter.delete("/:id", authenticate, serviceController.delete);
