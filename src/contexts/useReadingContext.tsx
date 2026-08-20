import { useContext } from "react";
import { readingContext } from "./readingContext";

export const useReadingContext = () => useContext(readingContext);
