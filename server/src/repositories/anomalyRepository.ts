import { pool } from "../db/pool";
import type { Severity } from "../types";

export interface NewAnomaly {
  title: string;
  description?: string;
  severity: Severity;
  detectedAt?: string;
}

export async function listAnomalies() {
  const result = await pool.query(`
    SELECT
      id,
      title,
      description,
      severity,
      detected_at,
      resolved_at,
      created_at
    FROM anomalies
    ORDER BY created_at DESC
    LIMIT 100;
  `);

  return result.rows;
}

export async function insertAnomaly(payload: NewAnomaly) {
  const result = await pool.query(
    `
    INSERT INTO anomalies (title, description, severity, detected_at)
    VALUES ($1, $2, $3, COALESCE($4::timestamptz, NOW()))
    RETURNING id, title, description, severity, detected_at, resolved_at, created_at;
  `,
    [payload.title, payload.description ?? null, payload.severity, payload.detectedAt ?? null],
  );

  return result.rows[0];
}


