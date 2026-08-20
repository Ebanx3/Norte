import { useState } from "react";
import { useSiteContext } from "../../../contexts/useSiteContext";
import { HomeContent } from "./homeContent";
import { Onboarding } from "./onboarding";

export const Home = () => {
  const { name, categories, updateName, addCategory, weight, updateWeight } = useSiteContext();
  const [draftName, setDraftName] = useState<string>(name);
  const [draftWeight, setDraftWeight] = useState<number>(weight || 75);
  const [selected, setSelected] = useState<Category[]>(categories);
  const [submitted, setSubmitted] = useState(false);

  const isOnboarding = name === "" || categories.length === 0;

  const toggleCategory = (category: Category) => {
    setSelected((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  const handleContinue = () => {
    setSubmitted(true);
    const trimmedName = draftName.trim();
    if (!trimmedName || selected.length === 0 || draftWeight <= 0) return;

    updateName(trimmedName);
    updateWeight(draftWeight);
    selected.forEach((category) => {
      if (!categories.includes(category)) addCategory(category);
    });
  };

  return (
    <div className="flex flex-col mx-auto max-w-6xl min-h-[calc(100vh-61px)] p-4 sm:p-6">

      {isOnboarding ? (
        <Onboarding
          draftName={draftName}
          setDraftName={setDraftName}
          draftWeight={draftWeight}
          setDraftWeight={setDraftWeight}
          selected={selected}
          submitted={submitted}
          toggleCategory={toggleCategory}
          handleContinue={handleContinue}
        />
      ) : (
        <HomeContent />
      )}
    </div>
  );
};