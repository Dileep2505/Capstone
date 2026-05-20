import { Request, Response, NextFunction } from "express";

import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      schema.parse(req.query);

      next();

    } catch (error: any) {

      return res.status(400).json({
        success: false,

        message: "Validation error",

        errors: error.errors,
      });
    }
  };