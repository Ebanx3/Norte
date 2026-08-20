import { useEffect, useState, type ReactNode } from "react";
import { siteContext } from "./siteContext";

const readCategoriesFromStorage = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("siteCategories") || "[]") as Category[];
  } catch {
    return [];
  }
};

export const SiteContextProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("siteName") ?? "";
  });
  const [goals, setGoals] = useState<Goal[]>([]);
  const [categories, setCategories] = useState<Category[]>(() => readCategoriesFromStorage());
  const [currency, setCurrency] = useState<Currency>(() => {
    if (typeof window === "undefined") return "pesos";
    return (localStorage.getItem("siteCurrency") as Currency) ?? "pesos";
  });
  const [weight, setWeight]=useState<number>(() => {
    if (typeof window === "undefined") return 75;
    return parseInt(localStorage.getItem("weight") ?? "75");});

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("siteName", name);
  }, [name]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("siteCategories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("siteCurrency", currency);
  }, [currency]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("weight", String(weight));
  }, [weight]);

  const updateName = (newName: string) => {
    setName(newName);
  };

  const addGoal = (goal: Goal) => {
    setGoals([...goals, goal]);
  };

  const removeGoal = (gid: string) => {
    setGoals((current) => current.filter((goal) => goal.id != gid));
  };

  const addCategory = (c: Category) => {
    setCategories((current) =>
      current.includes(c) ? current : [...current, c],
    );
  };

  const removeCategory = (c: Category) => {
    setCategories((current) => current.filter((category) => category !== c));
  };

  const updateCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  const updateWeight = (w:number) => {
    setWeight(w);
  }

  return (
    <siteContext.Provider
      value={{
        name,
        updateName,
        currency,
        updateCurrency,
        goals,
        addGoal,
        removeGoal,
        categories,
        addCategory,
        removeCategory,
        weight,
        updateWeight
      }}
    >
      {children}
    </siteContext.Provider>
  );
};
