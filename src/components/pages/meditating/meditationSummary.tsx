interface Props {
  totalDuration: number;
  weekSessions: number;
  monthSessions: number;
  completedSessions: number;
}

const metrics = [
  { key: "duration", label: "Tiempo total", suffix: "min", tone: "bg-blue-50 border-blue-200 text-blue-700" },
  { key: "week", label: "Esta semana", suffix: "sesiones", tone: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { key: "month", label: "Este mes", suffix: "sesiones", tone: "bg-violet-50 border-violet-200 text-violet-700" },
  { key: "completed", label: "Completadas", suffix: "sesiones", tone: "bg-cyan-50 border-cyan-200 text-cyan-700" },
] as const;

export const MeditationSummary = ({ totalDuration, weekSessions, monthSessions, completedSessions }: Props) => {
  const values = { duration: totalDuration, week: weekSessions, month: monthSessions, completed: completedSessions };

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.key} className={`rounded-3xl border p-5 shadow-sm ${metric.tone}`}>
          <p className="text-xs uppercase tracking-[0.2em]">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{values[metric.key]}</p>
          <p className="mt-1 text-sm text-slate-600">{metric.suffix}</p>
        </div>
      ))}
    </section>
  );
};
