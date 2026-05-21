import { Router } from "express";

import {
  getSubDistrictsByDistrict,
} from "../controllers/subdistricts.controller";
import {
  getDistrictsByState,
} from "../controllers/districts.controller";

const router = Router();

router.get("/", getDistrictsByState);
router.get("/:id/subdistricts", getSubDistrictsByDistrict);

export default router;