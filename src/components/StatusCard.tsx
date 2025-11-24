interface StatusCardProps {
  title: string;
  value: string;
  hint?: string;
  tone?: "default" | "success" | "warning" | "danger";
}

const toneMap: Record<NonNullable<StatusCardProps["tone"]>, string> = {
  default: "bg-card",
  success: "bg-success/10 border-success/40 text-success-foreground",
  warning: "bg-warning/10 border-warning/40 text-warning-foreground",
  danger: "bg-destructive/10 border-destructive/50 text-destructive-foreground",
};

export function StatusCard({ title, value, hint, tone = "default" }: StatusCardProps) {
  return (
    <article className={`rounded-lg border p-4 shadow-sm transition ${toneMap[tone]}`}>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </article>
  );
}


