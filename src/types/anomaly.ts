export type Severity = "low" | "medium" | "high" | "critical";

export interface Anomaly {
  id: string;
  title: string;
  description: string | null;
  severity: Severity;
  detectedAt: string;
  resolvedAt: string | null;
  createdAt: string;
}

export interface NewAnomalyPayload {
  title: string;
  description?: string;
  severity: Severity;
  detectedAt?: string;
}

export interface ApiHealth {
  status: "ok" | "error";
  dbLatencyMs?: number;
  timestamp: string;
  details?: string;
}


