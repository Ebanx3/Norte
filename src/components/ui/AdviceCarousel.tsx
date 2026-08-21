import { useState } from "react";
import { useLocation } from "react-router-dom";
import economyTips from "../../data/tips/economy.json";
import readingTips from "../../data/tips/reading.json";
import meditationTips from "../../data/tips/meditation.json";
import exerciseTips from "../../data/tips/exercise.json";

export type AdviceItem = {
  title: string;
  text: string;
  link?: string;
};

interface AdviceCarouselProps {
  title?: string;
  subtitle?: string;
}

const routeTitles: Record<string, string> = {
  "/economia": "Tips para tu economía",
  "/lectura": "Tips para leer mejor",
  "/meditacion": "Tips para meditar",
  "/actividad_fisica": "Tips para moverte mejor",
};

const routeTips: Record<string, AdviceItem[]> = {
  "/economia": economyTips,
  "/lectura": readingTips,
  "/meditacion": meditationTips,
  "/actividad_fisica": exerciseTips,
};

export const AdviceCarousel = ({
  title,
}: AdviceCarouselProps) => {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const resolvedTitle = title ?? routeTitles[location.pathname] ?? "Tips para tu día";
  const items = routeTips[location.pathname] ?? economyTips;

  if (!items.length) return null;

  const currentItem = items[currentIndex];
//   const accentClass = accentClasses[currentItem.accent ?? "slate"];

  const goToPrevious = () => {
    setCurrentIndex((previous) => (previous === 0 ? items.length - 1 : previous - 1));
  };

  const goToNext = () => {
    setCurrentIndex((previous) => (previous === items.length - 1 ? 0 : previous + 1));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-500">
           {resolvedTitle}
          </p>
          {/* <h2 className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">
            {resolvedTitle}
          </h2> */}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsCollapsed((value) => !value)}
            aria-label={isCollapsed ? "Expandir consejos" : "Colapsar consejos"}
            className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            {isCollapsed ? "Expandir" : "Colapsar"}
          </button>
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Anterior consejo"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Siguiente consejo"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            →
          </button>
        </div>
      </div>

      {!isCollapsed ? (
        <>
          <div className="mt-3 rounded-xl px-3 py-2.5">
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              {currentItem.title}
            </h3>
            <p className="mt-1.5 text-sm leading-5 text-slate-600">
              {currentItem.text}
            </p>
            {currentItem.link ? (
              <a
                href={currentItem.link}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-slate-700"
              >
                Ver recurso
              </a>
            ) : null}
          </div>

          <div className="mt-3 flex justify-center gap-1.5">
            {items.map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                type="button"
                aria-label={`Ir al consejo ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={[
                  "h-2 rounded-full transition-all",
                  index === currentIndex ? "w-5 bg-slate-800" : "w-2 bg-slate-300 hover:bg-slate-400",
                ].join(" ")}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
};
