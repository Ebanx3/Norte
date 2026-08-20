import { useExercisesContext } from "../../../../contexts/useExercisesContext";
import { Block } from "./block";

export const ExercisesBlock = () => {
  const { getCaloriesBurned, getLastWeekExercises, getLastMonthExercises } = useExercisesContext();

  const caloriesBurned = getCaloriesBurned();
  const weekExercises = getLastWeekExercises();
  const monthExercises = getLastMonthExercises();

  const getUniqueDays = (exercises: Exercise[]) => {
    const uniqueDates = new Set(exercises.map(e => new Date(e.date).toDateString()));
    return uniqueDates.size;
  };

  const weekDays = getUniqueDays(weekExercises);
  const monthDays = getUniqueDays(monthExercises);

  return (
    <Block title={"actividad fisica"} to="/actividad_fisica">
      <div className="grid gap-4">
        <div className="rounded-3xl bg-slate-50 p-4 shadow-sm border border-slate-200">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Días de ejercicio</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">Última semana</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{weekDays} días</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Último mes</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{monthDays} días</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-orange-50 p-4 shadow-sm border border-orange-200 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-[0.24em] text-orange-700">Calorías quemadas</p>
            <p className="mt-2 text-xl font-semibold text-orange-900 ml-auto">{caloriesBurned} kcal</p>
          </div>
          <div className="rounded-3xl bg-purple-950 p-4 shadow-sm border border-purple-500 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-[0.24em] text-purple-400">Total ejercicios</p>
            <p className="mt-2 text-xl font-semibold text-purple-100 ml-auto">{weekExercises.length}</p>
          </div>
        </div>
      </div>
    </Block>
  );
};