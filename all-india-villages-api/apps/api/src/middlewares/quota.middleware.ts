import { Request, Response, NextFunction } from "express";

import { prisma } from "../config/prisma";

export const checkQuota =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const apiKey =
        (req as any).apiKey;

      if (!apiKey) {

        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user =
        await prisma.user.findUnique({

          where: {
            id: apiKey.userId,
          },
        });

      if (!user) {

        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (
        user.monthlyUsage >=
        user.monthlyQuota
      ) {

        return res.status(429).json({

          success: false,

          message:
            "Monthly quota exceeded",
        });
      }

      await prisma.user.update({

        where: {
          id: user.id,
        },

        data: {
          monthlyUsage: {
            increment: 1,
          },
        },
      });

      next();

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
      });
    }
  };