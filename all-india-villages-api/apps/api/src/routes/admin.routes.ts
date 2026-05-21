import { Router } from "express";
import crypto from "crypto";
import { prisma } from "../config/prisma";

import {
  getDashboardStats,
} from "../controllers/admin.controller";

import {
  authenticate,
} from "../middlewares/auth.middleware";

import {
  getWeeklyAnalytics,
} from "../controllers/analytics.controller";

const router = Router();

router.use(authenticate);

router.get(
  "/dashboard",
  getDashboardStats
);

router.get(
  "/api-keys",
  async (_req, res) => {

    const apiKeys =
      await prisma.apiKey.findMany({

        orderBy: {
          createdAt: "desc",
        },
      });

    return res.json({
      success: true,
      data: apiKeys,
    });
  }
);

router.get(
  "/users",
  async (_req, res) => {

    try {

      const users =
        await prisma.user.findMany({

          orderBy: {
            createdAt: "desc",
          },

          select: {

            id: true,

            email: true,

            plan: true,

            monthlyQuota: true,

            monthlyUsage: true,

            status: true,

            createdAt: true,
          },
        });

      return res.json({
        success: true,
        data: users,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
      });
    }
  }
);

router.get(
  "/analytics/weekly",
  getWeeklyAnalytics
);

router.post(
  "/api-keys",
  async (req, res) => {

    try {

      const userId =
        (req as any).user.userId;

      const key =
        crypto.randomBytes(24)
          .toString("hex");

      const secret =
        crypto.randomBytes(32)
          .toString("hex");

      const apiKey =
        await prisma.apiKey.create({

          data: {

            key,

            secretHash: secret,

            name: "Production Key",

            userId,
          },
        });

      return res.json({
        success: true,

        data: {
          id: apiKey.id,
          key,
          secret,
        },
      });

    } catch (error) {

      console.error(
        "API KEY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to create API key",
      });
    }
  }
);

router.get(
  "/usage",
  authenticate,

  async (req, res) => {

    try {

      const userId =
        (req as any).user.userId;

      const user =
        await prisma.user.findUnique({

          where: {
            id: userId,
          },

          select: {

            monthlyUsage: true,

            monthlyQuota: true,

            plan: true,
          },
        });

      return res.json({
        success: true,
        data: user,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
      });
    }
  }
);

export default router;