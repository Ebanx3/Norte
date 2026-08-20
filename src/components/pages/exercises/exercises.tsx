import { useExercisesContext } from "../../../contexts/useExercisesContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { AddExerciseModal } from "./addExerciseModal";
import { ExerciseActionButton } from "./exerciseActionButton";
import { ExerciseItem } from "./exerciseItem";
import { ExercisesSummary } from "./exercisesSummary";

export const Exercises = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        exercises,
        removeExercise,
        getTotalDuration,
        getLastMonthExercises,
        getLastWeekExercises,
        getCaloriesBurned,
    } = useExercisesContext();

    const sortedExercises = [...exercises].sort(
        (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
    );
    const removeActivity = (exerciseId: string) => {
        removeExercise(exerciseId);
        toast.success("Actividad eliminada correctamente.");
    };

    return (
        <div className="mx-auto flex min-h-[calc(100vh-61px)] max-w-6xl flex-col gap-6 p-4 sm:p-6">
            <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Actividad física</p>
                        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Tu movimiento diario</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                            Registra tus entrenamientos y observa cómo construyes una rutina constante.
                        </p>
                    </div>
                    <ExerciseActionButton onClick={() => setIsModalOpen(true)} />
                </div>
            </section>

            <ExercisesSummary
                totalDuration={getTotalDuration()}
                totalCalories={getCaloriesBurned()}
                weekExercises={getLastWeekExercises().length}
                monthExercises={getLastMonthExercises().length}
            />

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Historial</p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Actividades registradas</h2>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {exercises.length} actividad{exercises.length === 1 ? "" : "es"}
                    </span>
                </div>
                <div className="mt-5 grid gap-3">
                    {sortedExercises.length > 0 ? (
                        sortedExercises.map((exercise) => (
                            <ExerciseItem key={exercise.id} exercise={exercise} onRemove={removeActivity} />
                        ))
                    ) : (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                            <p className="font-semibold text-slate-900">Todavía no hay actividades</p>
                            <p className="mt-2 text-sm text-slate-600">Agrega tu primer ejercicio para empezar a ver tu progreso.</p>
                        </div>
                    )}
                </div>
            </section>

            {isModalOpen ? <AddExerciseModal onClose={() => setIsModalOpen(false)} /> : null}
        </div>
    );
};