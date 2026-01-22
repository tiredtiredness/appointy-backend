import { Router } from "express";

import { authenticate } from "@/utils/authenticate";
import { validate } from "@/utils/validate";

import { userController } from "./user.controller";
import { updateUserSchema } from "./user.schema";

export const userRouter = Router();

userRouter.get("/", authenticate, userController.getById);
userRouter.put("/", authenticate, validate(updateUserSchema), userController.update);
userRouter.delete("/", authenticate, userController.delete);
