import type { Anomaly, ApiHealth, NewAnomalyPayload } from "../types/anomaly";

const API_BASE_URL = "/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getHealth(): Promise<ApiHealth> {
  const res = await fetch(`${API_BASE_URL}/health`);
  return handleResponse<ApiHealth>(res);
}

export async function listAnomalies(): Promise<Anomaly[]> {
  const res = await fetch(`${API_BASE_URL}/anomalies`);
  return handleResponse<Anomaly[]>(res);
}

export async function createAnomaly(payload: NewAnomalyPayload): Promise<Anomaly> {
  const res = await fetch(`${API_BASE_URL}/anomalies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<Anomaly>(res);
}


