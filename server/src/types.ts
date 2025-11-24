export type Severity = "low" | "medium" | "high" | "critical";

export interface AnomalyRecord {
  id: string;
  title: string;
  description: string | null;
  severity: Severity;
  detected_at: string;
  resolved_at: string | null;
  created_at: string;
}


