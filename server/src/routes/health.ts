import { Router } from "express";
import { pool } from "../db/pool";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res, next) => {
  const startedAt = Date.now();
  try {
    const dbResult = await pool.query("SELECT NOW()");
    const latency = Date.now() - startedAt;

    res.json({
      status: "ok",
      dbLatencyMs: latency,
      timestamp: new Date().toISOString(),
      details: `Database time: ${dbResult.rows[0].now}`,
    });
  } catch (error) {
    next(error);
  }
});


