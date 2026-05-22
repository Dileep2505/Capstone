import { Router } from "express";

import {
  createApiKey,
  getUserApiKeys,
  revokeApiKey,
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

router.delete(
  "/:id",
  authenticate,
  revokeApiKey
);

export default router;