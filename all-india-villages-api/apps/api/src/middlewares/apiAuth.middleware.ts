import { Request, Response, NextFunction } from "express";

import bcrypt from "bcryptjs";

import { prisma } from "../config/prisma";

export interface ApiRequest extends Request {
  apiUser?: any;
}

export const authenticateApiKey = async (
  req: ApiRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const apiKey =
      req.header("X-API-Key");

    const apiSecret =
      req.header("X-API-Secret");

    if (!apiKey || !apiSecret) {

      return res.status(401).json({
        success: false,
        message:
          "API key and secret required",
      });
    }

    const keyRecord =
      await prisma.apiKey.findUnique({

        where: {
          key: apiKey,
        },

        include: {
          user: true,
        },
      });

    if (!keyRecord) {

      return res.status(401).json({
        success: false,
        message: "Invalid API key",
      });
    }

    if (!keyRecord.isActive) {

      return res.status(403).json({
        success: false,
        message: "API key inactive",
      });
    }

    const isSecretValid =
      await bcrypt.compare(
        apiSecret,
        keyRecord.secretHash
      );

    if (!isSecretValid) {

      return res.status(401).json({
        success: false,
        message: "Invalid API secret",
      });
    }

    req.apiUser = keyRecord.user;

    next();

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};