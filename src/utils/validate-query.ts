import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

import { CustomError } from "@/lib/error/error.model";

export const validateQuery =
  (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req;
      await schema.validate(query, { abortEarly: false, stripUnknown: true });
      return next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return next(
          new CustomError({
            message: "Invalid query parameters",
            status: StatusCodes.BAD_REQUEST,
            response: error.errors,
            path: "validation.query",
          }),
        );
      }

      next(error);
    }
  };
