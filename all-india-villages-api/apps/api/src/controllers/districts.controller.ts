import { Request, Response } from "express";

import { prisma } from "../config/prisma";

export const getDistrictsByState = async (
  req: Request,
  res: Response
) => {
  try {

    const id = String(req.params.id || req.query.stateId || "");

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "stateId is required",
      });
    }

    const districts = await prisma.district.findMany({
      where: {
        stateId: id,
      },

      orderBy: {
        name: "asc",
      },

      select: {
        id: true,
        code: true,
        name: true,
      },
    });

    return res.json({
      success: true,
      count: districts.length,
      data: districts,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};