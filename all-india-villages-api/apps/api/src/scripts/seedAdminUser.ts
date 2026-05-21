import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";

export async function ensureAdminUser() {
  const defaultEmail = "admin@test.com";
  const defaultPassword = "123456";
  const adminEmail = process.env.ADMIN_EMAIL || defaultEmail;
  const adminPassword = process.env.ADMIN_PASSWORD || defaultPassword;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      if (process.env.ADMIN_PASSWORD) {
        const passwordHash = await bcrypt.hash(adminPassword, 10);
        await prisma.user.update({
          where: { email: adminEmail },
          data: { password: passwordHash },
        });
        console.log(`Updated password for admin user ${adminEmail}`);
      } else {
        console.log(`Admin user ${adminEmail} already exists.`);
      }
      return { email: adminEmail, password: adminPassword };
    }

    const userCount = await prisma.user.count();
    if (userCount > 0 && !process.env.ADMIN_PASSWORD) {
      console.log(
        `Existing users found; skipping admin seed for ${adminEmail}.`
      );
      return null;
    }

    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: passwordHash,
      },
    });

    console.log(`Created admin user ${adminEmail}`);
    return { email: adminEmail, password: adminPassword };
  } catch (err) {
    console.error("Failed to ensure admin user", err);
    return null;
  }
}
