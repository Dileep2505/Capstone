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

router.post(
  "/api-keys",
  async (req, res) => {

    return res.json({
      success: true,

      data: {
  key: "demo-api-key",
  secret: "demo-secret-key",
},
    });
  }
);

export default router;