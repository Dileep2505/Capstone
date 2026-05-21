import { Request, Response, NextFunction } from "express";

import { prisma } from "../config/prisma";

export const requestLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const start = Date.now();

  res.on("finish", async () => {
    try {
      const responseTime = Date.now() - start;

      const apiKeyHeader = req.header("X-API-Key");

      // If an API key is provided we skip here — authenticated API
      // requests use `apiLogger` which handles api-specific logging and
      // counters. This avoids duplicate logs and double-counting.
      if (apiKeyHeader) return;

      // If no API key, continue and log generic request information.
      // If an API key is provided, try to resolve it so we can attach
      // apiKeyId and userId to the log and update counters.
      let apiKeyRecord: any = null;

      if (apiKeyHeader) {
        apiKeyRecord = await prisma.apiKey.findUnique({
          where: { key: apiKeyHeader },
          select: { id: true, userId: true },
        });
      }

      const apiLogData: any = {
        endpoint: req.originalUrl,
        method: req.method,
        responseTime,
        statusCode: res.statusCode,
        ipAddress: req.ip || "unknown",
      };

      if (apiKeyRecord) {
        apiLogData.apiKeyId = apiKeyRecord.id;
        apiLogData.userId = apiKeyRecord.userId;
      }

      // Use a transaction to create the log and update counters atomically
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

        // Increment the user's monthlyUsage for successful responses (< 400).
        if (apiKeyRecord && res.statusCode < 400) {
          await tx.user.update({
            where: { id: apiKeyRecord.userId },
            data: { monthlyUsage: { increment: 1 } },
          });
        }
      });

    } catch (error) {
      console.error("REQUEST LOGGER ERROR:", error);
    }
  });

  next();
};