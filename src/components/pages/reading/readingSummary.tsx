interface Props {
  pagesRead: number;
  weekActivities: number;
  monthActivities: number;
  completedBooks: number;
}

const metrics = [
  { key: "pages", label: "Páginas leídas", suffix: "páginas", tone: "bg-blue-50 border-blue-200 text-blue-700" },
  { key: "week", label: "Esta semana", suffix: "sesiones", tone: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { key: "month", label: "Este mes", suffix: "sesiones", tone: "bg-violet-50 border-violet-200 text-violet-700" },
  { key: "completed", label: "Libros completados", suffix: "libros", tone: "bg-orange-50 border-orange-200 text-orange-700" },
] as const;

export const ReadingSummary = ({ pagesRead, weekActivities, monthActivities, completedBooks }: Props) => {
  const values = { pages: pagesRead, week: weekActivities, month: monthActivities, completed: completedBooks };
  return <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{metrics.map((metric) => <div key={metric.key} className={`rounded-3xl border p-5 shadow-sm ${metric.tone}`}><p className="text-xs uppercase tracking-[0.2em]">{metric.label}</p><p className="mt-3 text-3xl font-semibold text-slate-900">{values[metric.key]}</p><p className="mt-1 text-sm text-slate-600">{metric.suffix}</p></div>)}</section>;
};
