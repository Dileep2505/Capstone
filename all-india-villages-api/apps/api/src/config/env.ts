export const env = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  redisUrl: process.env.REDIS_URL || "",
  nodeEnv: process.env.NODE_ENV || "development"
};