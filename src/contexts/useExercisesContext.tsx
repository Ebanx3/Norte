import { useContext } from "react";
import { exercisesContext } from "./exercisesContext";

export const useExercisesContext = () => useContext(exercisesContext);