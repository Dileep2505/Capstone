import { Router }
  from "express";

import {

  getUsers,

  suspendUser,

  activateUser,

} from "../controllers/adminUsers.controller";

const router = Router();

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