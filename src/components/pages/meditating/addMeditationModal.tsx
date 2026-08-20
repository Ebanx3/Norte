import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useMeditatingContext } from "../../../contexts/useMeditatingContext";

const meditationTypes: { value: MeditationType; label: string }[] = [
  { value: "mindfulness", label: "Mindfulness" },
  { value: "respiración", label: "Respiración" },
  { value: "guiada", label: "Guiada" },
  { value: "mantra", label: "Mantra" },
  { value: "visualización", label: "Visualización" },
  { value: "otro", label: "Otro" },
];

const moods: { value: MeditationMood; label: string }[] = [
  { value: "relajado", label: "Relajado" },
  { value: "enfocado", label: "Enfocado" },
  { value: "estresado", label: "Estresado" },
  { value: "contento", label: "Contento" },
  { value: "calmado", label: "Calmado" },
  { value: "cansado", label: "Cansado" },
  { value: "tranquilo", label: "Tranquilo" },
];

interface Props {
  onClose: () => void;
}

export const AddMeditationModal = ({ onClose }: Props) => {
  const { addSession } = useMeditatingContext();
  const [type, setType] = useState<MeditationType>("mindfulness");
  const [mood, setMood] = useState<MeditationMood>("relajado");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedDuration = Number(duration);

    if (!parsedDuration || parsedDuration <= 0) {
      toast.error("Introduce una duración válida mayor a 0 minutos.");
      return;
    }

    addSession({
      type,
      mood,
      duration: parsedDuration,
      notes: notes.trim() || undefined,
    });
    toast.success("Sesión de meditación agregada correctamente.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-4xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Meditación</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Nueva sesión</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Registra unos minutos de pausa y atención para seguir tu práctica.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200" aria-label="Cerrar modal">
            ✕
          </button>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-700">
              <span className="font-medium">Tipo</span>
              <select value={type} onChange={(event) => setType(event.target.value as MeditationType)} className="w-full appearance-none rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500">
                {meditationTypes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-slate-700">
              <span className="font-medium">Estado de ánimo</span>
              <select value={mood} onChange={(event) => setMood(event.target.value as MeditationMood)} className="w-full appearance-none rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500">
                {moods.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm text-slate-700">
            <span className="font-medium">Duración (minutos)</span>
            <input type="number" min="1" step="1" value={duration} onChange={(event) => setDuration(event.target.value)} placeholder="10" className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500" />
          </label>

          <label className="grid gap-2 text-sm text-slate-700">
            <span className="font-medium">Notas <span className="font-normal text-slate-500">(opcional)</span></span>
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} placeholder="¿Cómo fue tu práctica?" className="w-full resize-none rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500" />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancelar</button>
            <button type="submit" className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Guardar sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
};
