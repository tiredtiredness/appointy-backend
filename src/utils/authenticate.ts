import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CustomError } from "@/lib/error/error.model";
import { passportLib } from "@/modules/auth/auth.strategy";

export const authenticate = (req: Request, res: Response, next: NextFunction) =>
  passportLib.authenticate("jwt", { session: false }, (error: unknown, user: Express.User) => {
    if (error instanceof Error) {
      next(
        new CustomError({
          message: error.message,
          status: StatusCodes.UNAUTHORIZED,
          path: "auth",
        }),
      );
    } else if (error) {
      next(error);
    }
    if (!user) {
      next(
        new CustomError({
          message: "Unauthorized",
          status: StatusCodes.UNAUTHORIZED,
          path: "auth",
        }),
      );
    }
    req.user = user;
    next();
  })(req, res, next);
