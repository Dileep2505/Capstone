import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const ensureAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user && req.user.role === "ADMIN") {
      return next();
    }

    return res.status(403).json({ success: false, message: "Forbidden" });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};
