import { Response, NextFunction } from "express";

import { prisma } from "../config/prisma";

import { ApiRequest } from "./apiAuth.middleware";

export const apiLogger = async (
  req: ApiRequest,
  res: Response,
  next: NextFunction
) => {

  const start = Date.now();

  res.on("finish", async () => {

    try {

      const responseTime =
        Date.now() - start;

      const apiKey =
        req.header("X-API-Key");

      let apiKeyRecord = null;

      if (apiKey) {

        apiKeyRecord =
          await prisma.apiKey.findUnique({
            where: {
              key: apiKey,
            },
          });
      }

      await prisma.apiLog.create({

        data: {

          endpoint: req.originalUrl,

          method: req.method,

          responseTime,

          statusCode: res.statusCode,

          ipAddress:
            req.ip || "unknown",

          apiKeyId:
            apiKeyRecord?.id,

          userId:
            req.apiUser?.id,
        },
      });

    } catch (error) {

      console.error(
        "API Log Error:",
        error
      );
    }
  });

  next();
};