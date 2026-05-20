import { Request, Response } from "express";

import { prisma } from "../config/prisma";

export const getSubDistrictsByDistrict = async (
  req: Request,
  res: Response
) => {
  try {

    const id = String(req.params.id);

    const subDistricts = await prisma.subDistrict.findMany({
      where: {
        districtId: id,
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
      count: subDistricts.length,
      data: subDistricts,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};