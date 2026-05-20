import { Router } from "express";

import {
  getAllStates,
} from "../controllers/states.controller";

import {
  getDistrictsByState,
} from "../controllers/districts.controller";

const router = Router();

router.get("/", getAllStates);

router.get("/:id/districts", getDistrictsByState);

export default router;