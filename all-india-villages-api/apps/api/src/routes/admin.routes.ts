import { Router } from "express";

import {
  getDashboardStats,
} from "../controllers/admin.controller";

const router = Router();

router.get(
  "/dashboard",
  getDashboardStats
);

router.get(
  "/api-keys",
  async (req, res) => {
    return res.json({
      success: true,
      data: [],
    });
  }
);

router.get(
  "/users",
  async (req, res) => {
    return res.json({
      success: true,
      data: [],
    });
  }
);

export default router;