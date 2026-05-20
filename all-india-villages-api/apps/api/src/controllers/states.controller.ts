import { Request, Response } from "express";

import { prisma } from "../config/prisma";

export const getAllStates = async (
  _req: Request,
  res: Response
) => {
  try {

    const states = await prisma.state.findMany({
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
      count: states.length,
      data: states,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};