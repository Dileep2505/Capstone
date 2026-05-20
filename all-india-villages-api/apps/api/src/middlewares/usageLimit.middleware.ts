import {
  Response,
  NextFunction,
} from "express";

import { prisma } from "../config/prisma";

import {
  ApiRequest,
} from "./apiAuth.middleware";

export const checkUsageLimit =
  async (
    req: ApiRequest,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const user =
        req.apiUser;

      if (!user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",
        });
      }

      const dbUser =
        await prisma.user.findUnique({

          where: {
            id: user.id,
          },
        });

      if (!dbUser) {

        return res.status(404).json({

          success: false,

          message: "User not found",
        });
      }

      if (
        dbUser.monthlyUsage >=
        dbUser.monthlyQuota
      ) {

        return res.status(429).json({

          success: false,

          message:
            "Monthly quota exceeded",
        });
      }

      await prisma.user.update({

        where: {
          id: dbUser.id,
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

        message:
          "Internal server error",
      });
    }
};