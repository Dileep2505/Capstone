import { Request, Response } from "express";

import { prisma } from "../config/prisma";

export const getDashboardStats = async (
  _req: Request,
  res: Response
) => {

  try {

    const totalUsers =
      await prisma.user.count();

    const totalApiKeys =
      await prisma.apiKey.count();

    const totalRequests =
      await prisma.apiLog.count();

    const avgResponse =
      await prisma.apiLog.aggregate({

        _avg: {
          responseTime: true,
        },
      });

    const recentRequests =
      await prisma.apiLog.findMany({

        orderBy: {
          createdAt: "desc",
        },

        take: 10,

        select: {
          endpoint: true,

          method: true,

          responseTime: true,

          statusCode: true,

          createdAt: true,
        },
      });

    return res.json({
      success: true,

      data: {

        totalUsers,

        totalApiKeys,

        totalRequests,

        averageResponseTime:
          avgResponse._avg.responseTime || 0,

        recentRequests,
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