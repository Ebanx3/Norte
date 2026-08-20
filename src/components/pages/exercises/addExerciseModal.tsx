import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useExercisesContext } from "../../../contexts/useExercisesContext";

const exerciseOptions: { value: TypeExercise; label: string }[] = [
  { value: "caminar", label: "Caminar" },
  { value: "correr", label: "Correr" },
  { value: "bicicleta", label: "Bicicleta" },
  { value: "gimnasio", label: "Gimnasio" },
  { value: "yoga", label: "Yoga" },
  { value: "natacion", label: "Natación" },
  { value: "deporte_equipo", label: "Deporte de equipo" },
  { value: "ejercicio_casa", label: "Ejercicio en casa" },
  { value: "elongacion", label: "Elongación" },
  { value: "crossfit", label: "Crossfit" },
  { value: "funcional", label: "Funcional" },
  { value: "otro", label: "Otro" },
];

interface Props {
  onClose: () => void;
}

export const AddExerciseModal = ({ onClose }: Props) => {
  const { addExercise } = useExercisesContext();
  const [type, setType] = useState<TypeExercise>("caminar");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState<Exercise["intensity"]>("media");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedDuration = Number(duration);

    if (!parsedDuration || parsedDuration <= 0) {
      toast.error("Introduce una duración válida mayor a 0 minutos.");
      return;
    }

    addExercise({ type, duration: parsedDuration, intensity });
    toast.success("Actividad agregada correctamente.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-4xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Actividad física</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Nueva actividad</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Registra el ejercicio realizado para actualizar tus métricas.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm text-slate-700">
            <span className="font-medium">Actividad</span>
            <select
              value={type}
              onChange={(event) => setType(event.target.value as TypeExercise)}
              className="w-full appearance-none rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
            >
              {exerciseOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm text-slate-700">
            <span className="font-medium">Duración (minutos)</span>
            <input
              type="number"
              min="1"
              step="1"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="30"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-700">
            <span className="font-medium">Intensidad</span>
            <select
              value={intensity}
              onChange={(event) => setIntensity(event.target.value as Exercise["intensity"])}
              className="w-full appearance-none rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Guardar actividad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
