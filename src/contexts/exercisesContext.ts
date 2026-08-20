import { createContext } from "react";

interface ExercisesContext {
    exercises: Exercise[];
    addExercise: (exercise: Omit<Exercise, "id" | "date" | "calories">) => void;
    removeExercise: (exerciseId: string) => void;
    updateExercise: (exercise: Exercise) => void;
    getTotalDuration: (items?: Exercise[]) => number;
    getLastMonthExercises: () => Exercise[];
    getLastWeekExercises: () => Exercise[];
    getCaloriesBurned: (items?: Exercise[]) => number;
}

export const exercisesContext = createContext({} as ExercisesContext);
