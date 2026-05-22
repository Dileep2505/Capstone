import { Router }
  from "express";

import {

  getUsers,

  suspendUser,

  activateUser,

} from "../controllers/adminUsers.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { ensureAdmin } from "../middlewares/admin.middleware";

const router = Router();

router.use(authenticate, ensureAdmin);

router.get(
  "/users",
  getUsers
);

router.patch(
  "/users/:id/suspend",
  suspendUser
);

router.patch(
  "/users/:id/activate",
  activateUser
);

export default router;