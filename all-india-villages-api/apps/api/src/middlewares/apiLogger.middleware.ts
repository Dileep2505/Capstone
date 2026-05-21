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

      // Create the log and update counters atomically when possible.
      const apiLogData: any = {
        endpoint: req.originalUrl,
        method: req.method,
        responseTime,
        statusCode: res.statusCode,
        ipAddress: req.ip || "unknown",
        apiKeyId: apiKeyRecord?.id,
        userId: req.apiUser?.id,
      };

      await prisma.$transaction(async (tx) => {
        await tx.apiLog.create({ data: apiLogData });

        if (apiKeyRecord) {
          await tx.apiKey.update({
            where: { id: apiKeyRecord.id },
            data: {
              requestCount: { increment: 1 },
              lastUsedAt: new Date(),
            },
          });
        }

        if (req.apiUser?.id && res.statusCode < 400) {
          await tx.user.update({
            where: { id: req.apiUser.id },
            data: { monthlyUsage: { increment: 1 } },
          });
        }
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