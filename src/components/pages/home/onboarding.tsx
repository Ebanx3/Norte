import type { Dispatch, SetStateAction } from "react";

const habitOptions: { title: Category; description: string }[] = [
  {
    title: "economía",
    description: "Controla tus finanzas personales con metas y seguimiento.",
  },
  // {
  //   title: "alimentación",
  //   description: "Mejora tu alimentación y crea hábitos nutritivos.",
  // },
  {
    title: "actividad fisica",
    description: "Construye una rutina de ejercicio constante.",
  },
  {
    title: "lectura",
    description: "Desarrolla un hábito de lectura regular.",
  },
  {
    title: "meditación",
    description: "Practica mindfulness y calma mental cada día.",
  },
];

interface OnboardingProps {
  draftName: string;
  setDraftName: Dispatch<SetStateAction<string>>;
  draftWeight: number;
  setDraftWeight: Dispatch<SetStateAction<number>>;
  selected: Category[];
  submitted: boolean;
  toggleCategory: (category: Category) => void;
  handleContinue: () => void;
}

export const Onboarding = ({
  draftName,
  setDraftName,
  draftWeight,
  setDraftWeight,
  selected,
  submitted,
  toggleCategory,
  handleContinue,
}: OnboardingProps) => {
  return (
    <section className="grid gap-6 rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.18)] sm:p-8">
      <div className="grid gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Bienvenido</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Comencemos con tus datos</h2>
          <p className="mt-2 text-sm text-slate-600">Dime tu nombre y elige los hábitos que quieres llevar en esta etapa.</p>
        </div>

        <label className="grid gap-2 text-sm text-slate-700">
          <span className="font-medium">Nombre</span>
          <input
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
          />
          {submitted && !draftName.trim() ? (
            <span className="text-xs text-red-600">Introduce tu nombre para continuar.</span>
          ) : null}
        </label>

        {/* <label className="grid gap-2 text-sm text-slate-700">
          <span className="font-medium">Peso (kg)</span>
          <input
            type="number"
            value={draftWeight}
            onChange={(event) => setDraftWeight(Number(event.target.value))}
            min={1}
            step={0.1}
            placeholder="75"
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
          />
          <p className="text-xs text-slate-500">Este peso se usará para estimar calorías cuando registres actividad física.</p>
          {submitted && draftWeight <= 0 ? (
            <span className="text-xs text-red-600">Introduce un peso válido para continuar.</span>
          ) : null}
        </label> */}
      </div>

      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Hábitos</p>
            <p className="text-sm text-slate-600">Selecciona al menos un hábito para comenzar.</p>
          </div>
          <span className="text-sm font-semibold text-slate-700">
            {selected.length} seleccionado{selected.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {habitOptions.map((habit) => {
            const isSelected = selected.includes(habit.title);
            return (
              <button
                key={habit.title}
                type="button"
                onClick={() => toggleCategory(habit.title)}
                className={`rounded-3xl border p-4 text-left transition ${
                  isSelected
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-400"
                }`}
              >
                <p className="font-semibold capitalize">{habit.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{habit.description}</p>
              </button>
            );
          })}
        </div>
        {submitted && selected.length === 0 ? (
          <p className="text-xs text-red-600">Selecciona al menos un hábito para continuar.</p>
        ) : null}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Guardar y continuar
        </button>
      </div>
    </section>
  );
};
