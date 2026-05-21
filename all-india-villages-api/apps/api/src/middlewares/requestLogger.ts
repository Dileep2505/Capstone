import { Request, Response, NextFunction } from "express";

import { prisma } from "../config/prisma";

export const requestLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const start =
    Date.now();

  res.on(
    "finish",
    async () => {

      try {

        const responseTime =
          Date.now() - start;

        await prisma.apiLog.create({

          data: {

            endpoint:
              req.originalUrl,

            method:
              req.method,

            responseTime,

            statusCode:
              res.statusCode,

            ipAddress:
              req.ip || "unknown",
          },
        });

      } catch (error) {

        console.error(
          "REQUEST LOGGER ERROR:",
          error
        );
      }
    }
  );

  next();
};