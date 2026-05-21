import { Request, Response } from "express";

import { prisma } from "../config/prisma";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {

    const [totalUsers, totalApiKeys, logs] = await Promise.all([
      prisma.user.count(),
      prisma.apiKey.count(),
      prisma.apiLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          endpoint: true,
          method: true,
          responseTime: true,
          statusCode: true,
          createdAt: true,
        },
      }),
    ]);

    const totalRequests = logs.length;
    const averageResponseTime =
      totalRequests > 0
        ? Math.round(
            logs.reduce((sum, log) => sum + log.responseTime, 0) /
              totalRequests
          )
        : 0;

    return res.json({
      success: true,

      data: {
        totalUsers,
        totalApiKeys,
        totalRequests,
        averageResponseTime,
        recentRequests: logs,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};