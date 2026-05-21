import {
  Request,
  Response,
} from "express";

import { prisma }
  from "../config/prisma";

export const getUsers =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const users =
        await prisma.user.findMany({

          orderBy: {
            createdAt: "desc",
          },

          select: {

            id: true,

            email: true,

            plan: true,

            status: true,

            monthlyUsage: true,

            monthlyQuota: true,

            createdAt: true,
          },
        });

      return res.json({

        success: true,

        count: users.length,

        data: users,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({

        success: false,

        message:
          "Internal server error",
      });
    }
};

export const suspendUser =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const { id: rawId } = req.params;
      const id = String(rawId);

      const user =
        await prisma.user.update({

          where: { id },

          data: {
            status:
              "SUSPENDED",
          },
        });

      return res.json({

        success: true,

        data: user,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({

        success: false,

        message:
          "Internal server error",
      });
    }
};

export const activateUser =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const { id: rawId } = req.params;
      const id = String(rawId);

      const user =
        await prisma.user.update({

          where: { id },

          data: {
            status:
              "ACTIVE",
          },
        });

      return res.json({

        success: true,

        data: user,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({

        success: false,

        message:
          "Internal server error",
      });
    }
};