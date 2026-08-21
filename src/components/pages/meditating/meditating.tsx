import { useState } from "react";
import { toast } from "react-toastify";
import { useMeditatingContext } from "../../../contexts/useMeditatingContext";
import { AdviceCarousel } from "../../ui/AdviceCarousel";
import { AddMeditationModal } from "./addMeditationModal";
import { MeditationActionButton } from "./meditationActionButton";
import { MeditationLinks } from "./meditationLinks";
import { MeditationSessionItem } from "./meditationSessionItem";
import { MeditationSummary } from "./meditationSummary";

export const Meditating = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    sessions,
    removeSession,
    getTotalDuration,
    getLastWeekSessions,
    getLastMonthSessions,
    getMoodSummary,
    getCompletedSessions,
  } = useMeditatingContext();

  const sortedSessions = [...sessions].sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
  const moodSummary = getMoodSummary();
  const favoriteMood = Object.entries(moodSummary).sort(([, first], [, second]) => second - first)[0]?.[0];

  const removeMeditation = (sessionId: string) => {
    removeSession(sessionId);
    toast.success("Sesión eliminada correctamente.");
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-61px)] max-w-6xl flex-col gap-6 p-4 sm:p-6">
      <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Meditación</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Un espacio para volver a ti</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Registra tus pausas conscientes y observa cómo evoluciona tu práctica.</p>
          </div>
          <MeditationActionButton onClick={() => setIsModalOpen(true)} />
        </div>
      </section>

      <MeditationSummary
        totalDuration={getTotalDuration()}
        weekSessions={getLastWeekSessions().length}
        monthSessions={getLastMonthSessions().length}
        completedSessions={getCompletedSessions().length}
      />

      <AdviceCarousel />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Historial</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Sesiones registradas</h2>
          </div>
          <div className="text-right">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {sessions.length} sesión{sessions.length === 1 ? "" : "es"}
            </span>
            {favoriteMood ? <p className="mt-2 text-xs text-slate-500">Tu ánimo más frecuente: <span className="font-semibold capitalize text-slate-700">{favoriteMood}</span></p> : null}
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {sortedSessions.length > 0 ? sortedSessions.map((session) => <MeditationSessionItem key={session.id} session={session} onRemove={removeMeditation} />) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="font-semibold text-slate-900">Todavía no hay sesiones</p>
              <p className="mt-2 text-sm text-slate-600">Registra tu primera práctica para empezar a construir este espacio.</p>
            </div>
          )}
        </div>
      </section>

      <MeditationLinks />
      {isModalOpen ? <AddMeditationModal onClose={() => setIsModalOpen(false)} /> : null}
    </div>
  );
};
