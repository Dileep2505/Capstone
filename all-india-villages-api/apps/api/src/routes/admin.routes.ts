import { Router } from "express";
import crypto from "crypto";
import { prisma } from "../config/prisma";

import {
  getDashboardStats,
} from "../controllers/admin.controller";

import {
  authenticate,
} from "../middlewares/auth.middleware";
import { ensureAdmin } from "../middlewares/admin.middleware";

import {
  getWeeklyAnalytics,
} from "../controllers/analytics.controller";
import {
  revokeApiKey,
} from "../controllers/apiKey.controller";

const router = Router();

router.use(authenticate, ensureAdmin);

router.get("/dashboard", getDashboardStats);

router.get("/api-keys", async (req, res) => {
  try {
    const userId = (req as any).user.userId;

    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ success: true, data: apiKeys });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
});

router.get("/users", async (_req, res) => {
  try {
    // Compute per-user usage for the current month from apiLog.
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        plan: true,
        monthlyQuota: true,
        status: true,
        createdAt: true,
      },
    });

    const counts = await prisma.apiLog.groupBy({
      by: ["userId"],
      where: {
        userId: { not: null },
        createdAt: { gte: startOfMonth, lt: startOfNextMonth },
        statusCode: { lt: 400 },
      },
      _count: { id: true },
    });

    const countsByUser: Record<string, number> = {};
    counts.forEach((c: any) => {
      if (c.userId) countsByUser[c.userId] = c._count.id;
    });

    const result = users.map((u) => ({
      ...u,
      monthlyUsage: countsByUser[u.id] || 0,
    }));

    return res.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
});

router.get("/analytics/weekly", getWeeklyAnalytics);

router.post("/api-keys", async (req, res) => {
  try {
    const userId = (req as any).user.userId;

    const key = crypto.randomBytes(24).toString("hex");
    const secret = crypto.randomBytes(32).toString("hex");

    const apiKey = await prisma.apiKey.create({
      data: {
        key,
        secretHash: secret,
        name: "Production Key",
        userId,
      },
    });

    return res.json({ success: true, data: { id: apiKey.id, key, secret } });
  } catch (error) {
    console.error("API KEY ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to create API key" });
  }
});

router.delete("/api-keys/:id", revokeApiKey);


router.get(
  "/usage",
  authenticate,
  async (req, res) => {
    try {
      const userId = (req as any).user.userId;

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      const monthlyUsage = await prisma.apiLog.count({
        where: {
          userId,
          createdAt: { gte: startOfMonth, lt: startOfNextMonth },
          statusCode: { lt: 400 },
        },
      });

      const user = await prisma.user.findUnique({ where: { id: userId }, select: { monthlyQuota: true, plan: true } });

      return res.json({ success: true, data: { monthlyUsage, monthlyQuota: user?.monthlyQuota ?? 0, plan: user?.plan ?? "FREE" } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false });
    }
  }
);

export default router;
