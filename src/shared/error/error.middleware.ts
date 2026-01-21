import { NextFunction, Request, Response } from "express";

import { CustomError } from "./error.model";

export const errorMiddleware = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(error.status || 500).json({
    status: error.status || "error",
    message: error.message || "Internal Server Error",
    response: error.response,
    path: error.path,
  });
};
