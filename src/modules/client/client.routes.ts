import { Router } from "express";

import { authenticate } from "@/utils/authenticate";
import { validate } from "@/utils/validate";

import { clientInterestController } from "../client-interest/client-interest.controller";
import { createTagSchema } from "../tag/tag.schema";
import { clientController } from "./client.controller";
import { createClientSchema, updateClientSchema } from "./client.schema";

export const clientRouter = Router();

clientRouter.get("/", authenticate, clientController.getById);
clientRouter.post("/", authenticate, validate(createClientSchema), clientController.create);
clientRouter.post(
  "/interest",
  authenticate,
  validate(createTagSchema),
  clientInterestController.add,
);
clientRouter.put("/", authenticate, validate(updateClientSchema), clientController.update);
clientRouter.delete("/", authenticate, clientController.delete);
