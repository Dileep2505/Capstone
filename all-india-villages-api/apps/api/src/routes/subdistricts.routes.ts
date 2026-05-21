import { Router } from "express";

import {
  getVillagesBySubDistrict,
} from "../controllers/villages.controller";
import {
  getSubDistrictsByDistrict,
} from "../controllers/subdistricts.controller";

const router = Router();

router.get("/", getSubDistrictsByDistrict);
router.get("/:id/villages", getVillagesBySubDistrict);

export default router;