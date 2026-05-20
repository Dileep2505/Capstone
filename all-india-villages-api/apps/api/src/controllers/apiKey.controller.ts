import { Response } from "express";

import bcrypt from "bcryptjs";

import { prisma } from "../config/prisma";

import {
  generateApiKey,
  generateApiSecret,
} from "../utils/generateApiCredentials";

import {
  AuthRequest,
} from "../middlewares/auth.middleware";

export const createApiKey = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const userId = req.user.userId;

    const { name } = req.body;

    const apiKey = generateApiKey();

    const apiSecret = generateApiSecret();

    const secretHash =
      await bcrypt.hash(apiSecret, 10);

    const createdKey =
      await prisma.apiKey.create({
        data: {
          key: apiKey,

          secretHash,

          name,

          userId,
        },

        select: {
          id: true,
          key: true,
          name: true,
          createdAt: true,
        },
      });

    return res.status(201).json({
      success: true,

      data: {
        ...createdKey,

        secret: apiSecret,
      },

      message:
        "Store this secret securely. It will not be shown again.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserApiKeys = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const userId = req.user.userId;

    const keys =
      await prisma.apiKey.findMany({

        where: {
          userId,
        },

        select: {
          id: true,

          key: true,

          name: true,

          isActive: true,

          createdAt: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return res.json({
      success: true,
      count: keys.length,
      data: keys,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};