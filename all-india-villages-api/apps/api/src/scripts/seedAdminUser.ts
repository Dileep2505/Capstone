import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";

export async function ensureAdminUser() {
  const defaultEmail = "admin@login.com";
  const defaultPassword = "Admin";
  const adminEmail = process.env.ADMIN_EMAIL || defaultEmail;
  const adminPassword = process.env.ADMIN_PASSWORD || defaultPassword;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await prisma.user.update({
        where: { email: adminEmail },
        data: {
          password: passwordHash,
          role: "ADMIN",
        },
      });
      console.log(`Updated admin user ${adminEmail} with role ADMIN`);
      return { email: adminEmail, password: adminPassword };
    }

    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: passwordHash,
        role: "ADMIN",
      },
      create: {
        email: adminEmail,
        password: passwordHash,
        role: "ADMIN",
      },
    });

    console.log(
      `Ensured admin user ${adminEmail} exists with role ADMIN and expected password`
    );
    return { email: adminEmail, password: adminPassword };
  } catch (err) {
    console.error("Failed to ensure admin user", err);
    return null;
  }
}
