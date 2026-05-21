import { Router } from "express";

const router = Router();

router.get(
  "/dashboard",
  async (req, res) => {
    res.json({
      success: true,
      data: {
        totalUsers: 1,
        totalApiKeys: 0,
        totalRequests: 0,
        averageResponseTime: 0,
        recentRequests: [],
      },
    });
  }
);

router.get(
  "/api-keys",
  async (req, res) => {
    res.json({
      success: true,
      data: [],
    });
  }
);

router.get(
  "/users",
  async (req, res) => {
    res.json({
      success: true,
      data: [],
    });
  }
);

export default router;