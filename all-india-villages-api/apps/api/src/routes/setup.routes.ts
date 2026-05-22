import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";

const router = Router();

// One-time admin setup endpoint. Protected by ADMIN_SETUP_TOKEN env var.
// POST /v1/setup/admin-create
router.post("/admin-create", async (req, res) => {
  try {
    const tokenHeader =
      (req.headers["x-admin-setup-token"] as string) ||
      req.body?.token;

    const configured = process.env.ADMIN_SETUP_TOKEN;
    if (!configured || tokenHeader !== configured) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    // Ensure role column exists (safe; uses IF NOT EXISTS)
    try {
      await prisma.$executeRawUnsafe(
        'ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role" TEXT DEFAULT \'USER\''
      );
    } catch (err) {
      // Log but continue; some DBs may not support IF NOT EXISTS, that's OK
      console.warn("Could not ensure role column exists:", err);
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@login.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin";

    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (existing) {
      await prisma.user.update({
        where: { email: adminEmail },
        data: { password: passwordHash, role: "ADMIN" },
      });
      return res.json({ success: true, message: "Admin updated" });
    }

    await prisma.user.create({
      data: { email: adminEmail, password: passwordHash, role: "ADMIN" },
    });

    return res.json({ success: true, message: "Admin created" });
  } catch (err: any) {
    console.error("Admin setup failed:", err);
    return res.status(500).json({ success: false, message: err?.message || "error" });
  }
});

export default router;
