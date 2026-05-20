import { Router } from "express";

import {
  autocompleteVillages,
} from "../controllers/autocomplete.controller";

import {
  authenticateApiKey,
} from "../middlewares/apiAuth.middleware";

import {
  apiLogger,
} from "../middlewares/apiLogger.middleware";

const router = Router();

router.get(
  "/",

  authenticateApiKey,

  apiLogger,

  autocompleteVillages
);

import {
  checkUsageLimit,
} from "../middlewares/usageLimit.middleware";

router.get(
  "/",
  authenticateApiKey,
  apiLogger,
  checkUsageLimit,
  autocompleteVillages
);

export default router;