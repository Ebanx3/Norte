import { useEffect, useState, type ReactNode } from "react";
import { exercisesContext } from "./exercisesContext";
import { v4 as uuid } from "uuid";
import { useSiteContext } from "./useSiteContext";

 const calculateCalories = (exercise: Omit<Exercise , "id" | "date" | "calories">, weight:number): number => {
  // Valores MET aproximados por tipo de actividad
  const MET_VALUES: Record<TypeExercise, number> = {
    caminar: 3.5,
    correr: 8.0,
    bicicleta: 7.5,
    gimnasio: 6.0,
    yoga: 2.5,
    natacion: 8.0,
    deporte_equipo: 7.0,
    ejercicio_casa: 5.0,
    elongacion: 2.3,
    crossfit: 9.0,
    funcional: 6.5,
    otro: 4.0,
  };

  let met = MET_VALUES[exercise.type];

  // Ajuste por intensidad
  if (exercise.intensity === "baja") met *= 0.8;
  if (exercise.intensity === "alta") met *= 1.2;



  // Fórmula: Calorías = MET × peso (kg) × duración (horas)
  const durationHours = exercise.duration / 60;
  const calories = met * weight * durationHours ;

  return Math.round(calories);
}

export const ExercisesCtxProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<Exercise[]>(
    JSON.parse(localStorage.getItem("exercises") || "[]"),
  );
  const { weight } = useSiteContext();


  const addExercise = (exercise: Omit<Exercise, "id" | "date" | "calories">) => {
    const newExercise = {
      ...exercise,
      id: uuid(),
      date: new Date().toLocaleString(),
      calories: calculateCalories(exercise, weight)
    };
    setExercises([...exercises, newExercise]);
  };

  const removeExercise = (exerciseId: string) => {
    setExercises((current) =>
      current.filter((exercise) => exercise.id !== exerciseId),
    );
  };

  const updateExercise = (exercise: Exercise) => {
    setExercises((current) =>
      current.map((item) => (item.id === exercise.id ? exercise : item)),
    );
  };

  const getTotalDuration = (items?: Exercise[]) => {
    const list = items ?? exercises;
    return list.reduce((acc, exercise) => acc + exercise.duration, 0);
  };

  const getLastMonthExercises = () => {
    const now = new Date();
    const lastMonth = new Date(now);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return exercises.filter((ex) => {
      const exDate = new Date(ex.date);
      return exDate >= lastMonth && exDate <= now;
    });
  };

   const getLastWeekExercises = () => {
    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);
    return exercises.filter((ex) => {
      const exDate = new Date(ex.date);
      return exDate >= lastWeek && exDate <= now;
    });
  };

  const getCaloriesBurned = (items?: Exercise[]) => {
    const list = items ?? exercises;
    return list.reduce((acc, exercise) => acc + calculateCalories(exercise, weight), 0);
  };

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  return (
    <exercisesContext.Provider
      value={{
        exercises,
        addExercise,
        removeExercise,
        updateExercise,
        getTotalDuration,
        getLastMonthExercises,
        getLastWeekExercises,
        getCaloriesBurned,
      }}
    >
      {children}
    </exercisesContext.Provider>
  );
};
