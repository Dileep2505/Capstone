import { Router } from "express";

import {
  getSubDistrictsByDistrict,
} from "../controllers/subdistricts.controller";

const router = Router();

router.get("/:id/subdistricts", getSubDistrictsByDistrict);

export default router;