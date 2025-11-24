import { Router } from "express";
import { z } from "zod";
import { insertAnomaly, listAnomalies } from "../repositories/anomalyRepository";

export const anomaliesRouter = Router();

const payloadSchema = z.object({
  title: z.string().min(3),
  description: z.string().max(2_000).optional(),
  severity: z.enum(["low", "medium", "high", "critical"]),
  detectedAt: z.string().datetime().optional(),
});

anomaliesRouter.get("/", async (_req, res, next) => {
  try {
    const data = await listAnomalies();
    const serialized = data.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      severity: row.severity,
      detectedAt: row.detected_at,
      resolvedAt: row.resolved_at,
      createdAt: row.created_at,
    }));
    res.json(serialized);
  } catch (error) {
    next(error);
  }
});

anomaliesRouter.post("/", async (req, res, next) => {
  try {
    const payload = payloadSchema.parse(req.body);
    const data = await insertAnomaly(payload);
    res.status(201).json({
      id: data.id,
      title: data.title,
      description: data.description,
      severity: data.severity,
      detectedAt: data.detected_at,
      resolvedAt: data.resolved_at,
      createdAt: data.created_at,
    });
  } catch (error) {
    next(error);
  }
});


