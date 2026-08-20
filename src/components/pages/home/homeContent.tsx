import { useSiteContext } from "../../../contexts/useSiteContext";
import { EconomyBlock } from "./blocks/economyBlock";
import { ExercisesBlock } from "./blocks/exercisesBlock";
import { MeditatingBlock } from "./blocks/meditatingBlock";
import { ReadingBlock } from "./blocks/readingBlock";
// import { FoodBlock } from "./blocks/foodBlock";

export const HomeContent = () => {
  const { categories } = useSiteContext();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {categories.includes("economía") && <EconomyBlock />}
      {categories.includes("actividad fisica") && <ExercisesBlock />}
      {categories.includes("lectura") && <ReadingBlock />}
      {categories.includes("meditación") && <MeditatingBlock />}
      {/* {categories.includes("alimentación") && <FoodBlock />} */}
    </div>
  );
};
