import express from "express";
import cors from "cors";
import { env } from "./env";
import { healthRouter } from "./routes/health";
import { anomaliesRouter } from "./routes/anomalies";

export function createServer() {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGIN ?? true,
      credentials: true,
    }),
  );
  app.use(express.json());

  app.use("/api/health", healthRouter);
  app.use("/api/anomalies", anomaliesRouter);

  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err.message ?? "Unexpected server error",
    });
  });

  return app;
}


