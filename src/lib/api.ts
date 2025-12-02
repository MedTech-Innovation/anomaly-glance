import type { Anomaly, ApiHealth, NewAnomalyPayload } from "../types/anomaly";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:8000";

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getHealth(): Promise<ApiHealth> {
  const res = await fetch(buildUrl("/health"));
  return handleResponse<ApiHealth>(res);
}

export async function listAnomalies(): Promise<Anomaly[]> {
  const res = await fetch(buildUrl("/anomalies"));
  return handleResponse<Anomaly[]>(res);
}

export async function createAnomaly(payload: NewAnomalyPayload): Promise<Anomaly> {
  const res = await fetch(buildUrl("/anomalies"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<Anomaly>(res);
}


