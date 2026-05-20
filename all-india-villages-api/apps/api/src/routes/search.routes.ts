import { Router } from "express";

import {
  searchVillages,
} from "../controllers/search.controller";

import {
  authenticateApiKey,
} from "../middlewares/apiAuth.middleware";

import {
  apiLogger,
} from "../middlewares/apiLogger.middleware";

import {
  validate,
} from "../middlewares/validate.middleware";


import {
  searchQuerySchema,
} from "../validators/search.validator";

const router = Router();

router.get(
  "/",

  authenticateApiKey,

  apiLogger,

  validate(searchQuerySchema),

  searchVillages
);

import {
  checkUsageLimit,
} from "../middlewares/usageLimit.middleware";

router.get(
  "/",
  authenticateApiKey,
  apiLogger,
  validate(searchQuerySchema),
  checkUsageLimit,
  searchVillages
);

export default router;