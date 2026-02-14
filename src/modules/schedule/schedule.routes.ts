import { Router } from "express";

import { authenticate } from "@/utils/authenticate";
import { validate } from "@/utils/validate";
import { validateQuery } from "@/utils/validate-query";

import { scheduleController } from "./schedule.controller";
import { createScheduleSchema, scheduleQuerySchema, updateScheduleSchema } from "./schedule.schema";

export const scheduleRouter = Router();

scheduleRouter.get(
  "/",
  authenticate,
  validateQuery(scheduleQuerySchema),
  scheduleController.getByDate,
);
scheduleRouter.get("/:id", authenticate, scheduleController.getById);
scheduleRouter.post("/", authenticate, validate(createScheduleSchema), scheduleController.create);
scheduleRouter.put("/:id", authenticate, validate(updateScheduleSchema), scheduleController.update);
scheduleRouter.delete("/:id", authenticate, scheduleController.delete);
