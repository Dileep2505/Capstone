import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { prisma } from "../config/prisma";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      email,
      password,
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const passwordHash = await bcrypt.hash(
      password,
      10
    );

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },

      select: {
        id: true,
        email: true,
      },
    });

    return res.status(201).json({
      success: true,
      data: user,
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      email,
      password,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },

      process.env.JWT_SECRET as string,

      {
        expiresIn: "24h",
      }
    );

    return res.json({
      success: true,

      token,
      role: user.role,
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};