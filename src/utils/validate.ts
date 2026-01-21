import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

import { CustomError } from "@/lib/error/error.model";

export const validate =
  (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      await schema.validate(body, { abortEarly: false, stripUnknown: true });
      return next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return next(
          new CustomError({
            message: "Validation error",
            status: StatusCodes.BAD_REQUEST,
            response: error.errors,
            path: "validation",
          }),
        );
      }

      next(error);
    }
  };
