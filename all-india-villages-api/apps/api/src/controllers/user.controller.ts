import { Response } from "express";

import { prisma } from "../config/prisma";

import { AuthRequest } from "../middlewares/auth.middleware";

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response
) => {

  return res.json({
    success: true,

    user: req.user,
  });
};

export const getCurrentUserUsage = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId = req.user.userId;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [monthlyUsage, user, apiKeyCount] = await Promise.all([
      prisma.apiLog.count({
        where: {
          userId,
          createdAt: { gte: startOfMonth, lt: startOfNextMonth },
          statusCode: { lt: 400 },
        },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { monthlyQuota: true, plan: true },
      }),
      prisma.apiKey.count({
        where: { userId },
      }),
    ]);

    return res.json({
      success: true,
      data: {
        monthlyUsage,
        monthlyQuota: user?.monthlyQuota ?? 0,
        plan: user?.plan ?? "FREE",
        remainingRequests: Math.max((user?.monthlyQuota ?? 0) - monthlyUsage, 0),
        apiKeyCount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};