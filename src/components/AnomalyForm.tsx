import { useState } from "react";
import type { NewAnomalyPayload, Severity } from "../types/anomaly";

const severityOptions: { value: Severity; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

interface AnomalyFormProps {
  onSubmit: (payload: NewAnomalyPayload) => Promise<void>;
}

export function AnomalyForm({ onSubmit }: AnomalyFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("medium");
  const [detectedAt, setDetectedAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        title,
        description: description || undefined,
        severity,
        detectedAt: detectedAt || undefined,
      });
      setTitle("");
      setDescription("");
      setDetectedAt("");
      setSeverity("medium");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit anomaly");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
      <div>
        <label className="text-sm font-medium text-muted-foreground" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Unexpected CPU spike"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          rows={3}
          placeholder="Describe the anomaly context"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-muted-foreground" htmlFor="severity">
            Severity
          </label>
          <select
            id="severity"
            name="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value as Severity)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {severityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground" htmlFor="detectedAt">
            Detected at
          </label>
          <input
            id="detectedAt"
            type="datetime-local"
            name="detectedAt"
            value={detectedAt}
            onChange={(e) => setDetectedAt(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Saving..." : "Record anomaly"}
      </button>
    </form>
  );
}


