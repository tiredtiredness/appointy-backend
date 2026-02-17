import { Router } from "express";

import { validate } from "@/utils/validate";
import { validateQuery } from "@/utils/validate-query";

import { breakController } from "./break.controller";
import { breakQuerySchema, createBreakSchema, updateBreakSchema } from "./break.schema";

export const breakRouter = Router();

breakRouter.get("/:id", breakController.getById);
breakRouter.get("/", validateQuery(breakQuerySchema), breakController.getByScheduleId);
breakRouter.post("/", validate(createBreakSchema), breakController.create);
breakRouter.put("/:id", validate(updateBreakSchema), breakController.update);
breakRouter.delete("/:id", breakController.delete);
