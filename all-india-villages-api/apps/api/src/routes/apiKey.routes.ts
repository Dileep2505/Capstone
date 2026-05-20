import { Router } from "express";

import {
  createApiKey,
  getUserApiKeys,
} from "../controllers/apiKey.controller";

import {
  authenticate,
} from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  createApiKey
);

router.get(
  "/",
  authenticate,
  getUserApiKeys
);

export default router;