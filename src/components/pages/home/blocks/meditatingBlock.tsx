import { Block } from "./block";
import { useMeditatingContext } from "../../../../contexts/useMeditatingContext";

export const MeditatingBlock = () => {
  const { sessions, links, getTotalDuration, getLastMonthSessions} = useMeditatingContext();

  const lastSession = [...(sessions ?? [])]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const monthSessions = getLastMonthSessions();
  // const completedCount = getCompletedSessions().length;
  const totalDuration = getTotalDuration();

  const formatDate = (date: string) => new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Block title={"meditación"} to="/meditacion">
      <div className="grid gap-4">
        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Última sesión</p>
          {lastSession ? (
            <>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{lastSession.type}</p>
              <p className="text-sm text-slate-600">{formatDate(lastSession.date)}</p>
              <div className="mt-4 grid gap-2 text-sm text-slate-700">
                <p>Duración: <span className="font-semibold text-slate-900">{lastSession.duration} min</span></p>
                <p>Estado: <span className="font-semibold text-slate-900">{lastSession.mood}</span></p>
                {lastSession.notes ? <p>Notas: <span className="font-semibold text-slate-900">{lastSession.notes}</span></p> : null}
                {links.length > 0 ? <p>Enlaces guardados: <span className="font-semibold text-slate-900">{links.length}</span></p> : null}
              </div>
            </>
          ) : (
            <div>
              <p className="mt-2 text-2xl font-semibold text-slate-900">Sin sesiones aún</p>
              <p className="mt-2 text-sm text-slate-600">Registra tu primera sesión para ver aquí el resumen.</p>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-4 shadow-sm border border-slate-200 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Duración total</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{totalDuration} min</p>
          </div>
          <div className="rounded-3xl bg-blue-50 p-4 shadow-sm border border-blue-200 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-[0.24em] text-blue-700">Sesiones último mes</p>
            <p className="mt-2 text-3xl font-semibold text-blue-900">{monthSessions.length}</p>
          </div>
        </div>
      </div>
    </Block>
  );
};