import { useContext } from "react";
import { economyContext } from "./economyContext";

export const useEconomyContext = () => useContext(economyContext);
