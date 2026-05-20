import { Request, Response } from "express";

import { prisma } from "../config/prisma";
import type { Village } from "@prisma/client";

export const autocompleteVillages = async (
  req: Request,
  res: Response
) => {
  try {

    const q = String(req.query.q || "").trim();

    if (q.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Query must be at least 2 characters",
      });
    }

    const limit = Number(req.query.limit || 10);

    const villages = await prisma.village.findMany({

      where: {
        name: {
          startsWith: q,
          mode: "insensitive",
        },
      },

      take: limit,

      orderBy: {
        name: "asc",
      },

      include: {
        subDistrict: {
          include: {
            district: {
              include: {
                state: true,
              },
            },
          },
        },
      },
    });

    const suggestions = villages.map((village: any) => ({
      value: village.code,

      label: village.name,

      fullAddress: `${village.name}, ${village.subDistrict.name}, ${village.subDistrict.district.name}, ${village.subDistrict.district.state.name}, India`,
    }));

    return res.json({
      success: true,
      count: suggestions.length,
      data: suggestions,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};