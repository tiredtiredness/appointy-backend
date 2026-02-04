import { Router } from "express";

import { authenticate } from "@/utils/authenticate";
import { validate } from "@/utils/validate";

import { authController } from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.schema";

export const authRouter = Router();

authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);

authRouter.post("/logout-all", authenticate, authController.logoutAll);
authRouter.post("/change-password", authenticate, authController.changePassword);
authRouter.get("/profile", authenticate, authController.getProfile);
