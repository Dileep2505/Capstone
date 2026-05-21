import { Request, Response } from "express";

import { prisma } from "../config/prisma";

export const getVillagesBySubDistrict = async (
  req: Request,
  res: Response
) => {
  try {

    const id = String(req.params.id || req.query.subdistrictId || "");

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "subdistrictId is required",
      });
    }

    const page = Number(req.query.page || 1);

    const limit = Number(req.query.limit || 50);

    const skip = (page - 1) * limit;

    const villages = await prisma.village.findMany({
      where: {
        subDistrictId: id,
      },

      orderBy: {
        name: "asc",
      },

      skip,

      take: limit,

      select: {
        id: true,
        code: true,
        name: true,
      },
    });

    const total = await prisma.village.count({
      where: {
        subDistrictId: id,
      },
    });

    return res.json({
      success: true,

      count: villages.length,

      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },

      data: villages,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};