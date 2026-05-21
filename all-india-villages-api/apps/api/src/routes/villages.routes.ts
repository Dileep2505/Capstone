import { Router } from "express";

import {
  getVillagesBySubDistrict,
} from "../controllers/villages.controller";

const router = Router();

router.get("/", getVillagesBySubDistrict);

export default router;
