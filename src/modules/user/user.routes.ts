import { Router } from "express";
import passport from "passport";

import { userController } from "./user.controller";

export const userRouter = Router();

const authenticate = passport.authenticate("jwt", { session: false });

userRouter.get("/", authenticate, userController.getAll);
userRouter.get("/:id", authenticate, userController.getById);
userRouter.put("/:id", authenticate, userController.update);
userRouter.delete("/:id", authenticate, userController.delete);
