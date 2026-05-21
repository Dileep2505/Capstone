import routes from "./routes";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.middleware";
import { apiRateLimiter } from "./middlewares/rateLimit.middleware";
import {
  requestLogger,
} from "./middlewares/requestLogger";

dotenv.config();

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());
app.use(apiRateLimiter);

app.use(morgan("dev"));
app.use(requestLogger);

app.use("/v1", routes);

app.use(errorMiddleware);

app.get("/", (_req, res) => {
  return res.json({
    success: true,
    message: "Village API Running Successfully",
  });
});

export default app;