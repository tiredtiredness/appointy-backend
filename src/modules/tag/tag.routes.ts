import { Router } from "express";

import { authenticate } from "@/utils/authenticate";
import { validate } from "@/utils/validate";

import { tagController } from "./tag.controller";
import { createTagSchema, updateTagSchema } from "./tag.schema";

export const tagRouter = Router();

tagRouter.get("/", authenticate, tagController.getAll);
tagRouter.get("/:id", authenticate, tagController.getById);
tagRouter.post("/", authenticate, validate(createTagSchema), tagController.create);
tagRouter.put("/:id", authenticate, validate(updateTagSchema), tagController.update);
tagRouter.delete("/:id", authenticate, tagController.delete);
