import { Request, Response } from "express";

import { prisma } from "../config/prisma";

export const getWeeklyAnalytics =
  async (
    _req: Request,
    res: Response
  ) => {

    try {

      const logs =
        await prisma.apiLog.findMany({

          select: {
            createdAt: true,
          },
        });

      const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ];

      const stats = days.map(
        (day) => ({
          day,
          requests: 0,
        })
      );

      logs.forEach((log) => {

        const day =
          days[
            new Date(
              log.createdAt
            ).getDay()
          ];

        const existing =
          stats.find(
            (s) => s.day === day
          );

        if (existing) {

          existing.requests += 1;
        }
      });

      return res.json({
        success: true,
        data: stats,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
      });
    }
  };