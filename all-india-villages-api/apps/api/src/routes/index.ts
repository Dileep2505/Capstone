import { Router } from "express";

import statesRouter from "./states.routes";
import districtsRouter from "./districts.routes";
import subdistrictsRouter from "./subdistricts.routes";
import searchRouter from "./search.routes";
import autocompleteRouter from "./autocomplete.routes";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import apiKeyRouter from "./apiKey.routes";
import adminRouter from "./admin.routes";
import adminUsersRoutes
from "./adminUsers.routes";
import setupRouter from "./setup.routes";
import villagesRouter from "./villages.routes";
import {
  checkQuota,
} from "../middlewares/quota.middleware";

const router = Router();

router.use("/states", statesRouter);
router.use(
  "/admin",
  adminUsersRoutes
);
router.use("/districts", districtsRouter);

router.use("/subdistricts", subdistrictsRouter);
router.use("/villages", villagesRouter);

router.use("/search", searchRouter);

router.use("/autocomplete", autocompleteRouter);

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/api-keys", apiKeyRouter);

router.use("/admin", adminRouter);
router.use("/setup", setupRouter);



export default router;