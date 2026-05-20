import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response
) => {

  return res.json({
    success: true,

    user: req.user,
  });
};