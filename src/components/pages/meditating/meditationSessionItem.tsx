import { formatDate } from "../../../utils/formatDate";

const typeLabels: Record<MeditationType, string> = {
  mindfulness: "Mindfulness",
  respiración: "Respiración",
  guiada: "Guiada",
  mantra: "Mantra",
  visualización: "Visualización",
  otro: "Otro",
};

interface Props {
  session: MeditationSession;
  onRemove: (id: string) => void;
}

export const MeditationSessionItem = ({ session, onRemove }: Props) => {
  return (
    <article className="rounded-3xl border border-slate-200 border-l-4 border-l-violet-500 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-violet-600">{typeLabels[session.type]}</span>
            <span className="text-lg font-semibold text-slate-900">{session.duration} min</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-600">
            <span>Ánimo: {session.mood}</span>
            <span>{session.completed ? "Completada" : "Pendiente"}</span>
          </div>
          {session.notes ? <p className="mt-2 text-sm text-slate-700">{session.notes}</p> : null}
          <p className="mt-1 text-xs text-slate-500">{formatDate(session.date)}</p>
        </div>
        <button type="button" onClick={() => onRemove(session.id)} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-900">Eliminar</button>
      </div>
    </article>
  );
};
