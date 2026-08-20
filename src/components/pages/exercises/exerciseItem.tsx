import { formatDate } from "../../../utils/formatDate";

const exerciseLabels: Record<TypeExercise, string> = {
  caminar: "Caminar",
  correr: "Correr",
  bicicleta: "Bicicleta",
  gimnasio: "Gimnasio",
  yoga: "Yoga",
  natacion: "Natación",
  deporte_equipo: "Deporte de equipo",
  ejercicio_casa: "Ejercicio en casa",
  elongacion: "Elongación",
  crossfit: "Crossfit",
  funcional: "Funcional",
  otro: "Otro",
};

const intensityLabels: Record<NonNullable<Exercise["intensity"]>, string> = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
};

interface Props {
  exercise: Exercise;
  onRemove: (id: string) => void;
}

export const ExerciseItem = ({ exercise, onRemove }: Props) => {
  return (
    <article className="rounded-3xl border border-slate-200 border-l-4 border-l-blue-500 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
              {exerciseLabels[exercise.type]}
            </span>
            <span className="text-lg font-semibold text-slate-900">{exercise.duration} min</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-600">
            <span>{exercise.calories} kcal</span>
            {exercise.intensity ? <span>Intensidad {intensityLabels[exercise.intensity]}</span> : null}
          </div>
          <p className="mt-1 text-xs text-slate-500">{formatDate(exercise.date)}</p>
        </div>
        <button
          type="button"
          onClick={() => onRemove(exercise.id)}
          className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};
