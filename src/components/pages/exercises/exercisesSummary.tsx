interface Props {
  totalDuration: number;
  totalCalories: number;
  weekExercises: number;
  monthExercises: number;
}

const metricCards = [
  { key: "duration", label: "Tiempo total", suffix: "min", tone: "bg-blue-50 border-blue-200 text-blue-700" },
  { key: "calories", label: "Calorías quemadas", suffix: "kcal", tone: "bg-orange-50 border-orange-200 text-orange-700" },
  { key: "week", label: "Esta semana", suffix: "actividades", tone: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { key: "month", label: "Este mes", suffix: "actividades", tone: "bg-violet-50 border-violet-200 text-violet-700" },
] as const;

export const ExercisesSummary = ({ totalDuration, totalCalories, weekExercises, monthExercises }: Props) => {
  const values = { duration: totalDuration, calories: totalCalories, week: weekExercises, month: monthExercises };

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metricCards.map((card) => (
        <div key={card.key} className={`rounded-3xl border p-5 shadow-sm ${card.tone}`}>
          <p className="text-xs uppercase tracking-[0.2em]">{card.label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{values[card.key]}</p>
          <p className="mt-1 text-sm text-slate-600">{card.suffix}</p>
        </div>
      ))}
    </section>
  );
};
