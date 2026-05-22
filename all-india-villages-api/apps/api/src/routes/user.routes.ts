import { Router } from "express";

import {
  getCurrentUser,
  getCurrentUserUsage,
} from "../controllers/user.controller";

import {
  authenticate,
} from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/me",
  authenticate,
  getCurrentUser
);

router.get(
  "/me/usage",
  authenticate,
  getCurrentUserUsage
);

export default router;