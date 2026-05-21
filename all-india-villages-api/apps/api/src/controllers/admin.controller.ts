import { Request, Response } from "express";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {

    return res.json({
      success: true,

      data: {
        totalUsers: 1,
        totalApiKeys: 0,
        totalRequests: 0,
        averageResponseTime: 0,
        recentRequests: [],
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};