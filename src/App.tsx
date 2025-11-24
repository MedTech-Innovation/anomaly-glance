import { useCallback, useEffect, useState } from "react";
import { StatusCard } from "./components/StatusCard";
import { AnomalyForm } from "./components/AnomalyForm";
import { createAnomaly, getHealth, listAnomalies } from "./lib/api";
import type { Anomaly, ApiHealth, NewAnomalyPayload } from "./types/anomaly";

function App() {
  const [health, setHealth] = useState<ApiHealth | null>(null);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [anomalyError, setAnomalyError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshHealth = useCallback(async () => {
    try {
      const result = await getHealth();
      setHealth(result);
      setHealthError(null);
    } catch (err) {
      setHealth(null);
      setHealthError(err instanceof Error ? err.message : "Unable to reach API");
    }
  }, []);

  const refreshAnomalies = useCallback(async () => {
    try {
      const result = await listAnomalies();
      setAnomalies(result);
      setAnomalyError(null);
    } catch (err) {
      setAnomalyError(err instanceof Error ? err.message : "Unable to load anomalies");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshHealth();
    refreshAnomalies();
  }, [refreshHealth, refreshAnomalies]);

  const handleCreate = async (payload: NewAnomalyPayload) => {
    await createAnomaly(payload);
    await refreshAnomalies();
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Anomaly Glance</p>
        <h1 className="text-3xl font-bold">Operational insight dashboard</h1>
        <p className="text-muted-foreground">
          Verify your Postgres connection, stream anomalies into the database, and visualize their current status.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <StatusCard
          title="API health"
          value={health?.status === "ok" ? "Connected" : "Unavailable"}
          hint={healthError ?? `Latency: ${health?.dbLatencyMs ?? 0} ms`}
          tone={health?.status === "ok" ? "success" : healthError ? "danger" : "warning"}
        />
        <StatusCard title="Total anomalies" value={anomalies.length.toString()} hint="Records in Postgres" />
        <StatusCard
          title="Last heartbeat"
          value={health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : "—"}
          hint={health?.details ?? "Checks API + DB connectivity"}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,3fr]">
        <AnomalyForm onSubmit={handleCreate} />

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Recent anomalies</h2>
            <p className="text-sm text-muted-foreground">Data lives in Postgres and is served from the API layer.</p>
          </div>

          {anomalyError ? <p className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-destructive">{anomalyError}</p> : null}

          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading anomalies...</p>
          ) : anomalies.length === 0 ? (
            <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
              No anomalies recorded yet. Use the form to seed your database.
            </p>
          ) : (
            <ul className="space-y-3">
              {anomalies.map((anomaly) => (
                <li key={anomaly.id} className="rounded-lg border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold">{anomaly.title}</p>
                      <p className="text-sm text-muted-foreground">{anomaly.description ?? "No description provided."}</p>
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase text-secondary-foreground">
                      {anomaly.severity}
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Detected {new Date(anomaly.detectedAt).toLocaleString()} · Created{" "}
                    {new Date(anomaly.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;


