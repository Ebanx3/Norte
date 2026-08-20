import { useSiteContext } from "../../contexts/useSiteContext";

const allHabits: { title: Category; label: string }[] = [
  { title: "economía", label: "Economía" },
  // { title: "alimentación", label: "Alimentación" },
  { title: "actividad fisica", label: "Actividad física" },
  { title: "lectura", label: "Lectura" },
  { title: "meditación", label: "Meditación" },
];

const currencies: { value: Currency; label: string; symbol: string }[] = [
  { value: "pesos", label: "Pesos", symbol: "$" },
  { value: "dolares", label: "Dólares", symbol: "USD" },
  { value: "euros", label: "Euros", symbol: "€" },
];

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
  const {
    name,
    updateName,
    weight,
    updateWeight,
    currency,
    updateCurrency,
    categories,
    addCategory,
    removeCategory,
  } = useSiteContext();

  if (!open) return null;

  const toggleHabit = (habit: Category) => {
    if (categories.includes(habit)) {
      removeCategory(habit);
      return;
    }

    addCategory(habit);
  };

  return (
    <div className="absolute top-0 left-0 w-full z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-slate-900/50 p-2">
      <div className="w-full max-w-2xl rounded-4xl bg-white p-4 shadow-2xl ring-1 ring-slate-200 sm:p-8" >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Ajustes</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Preferencias del usuario</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Cambia tu nombre o administra los hábitos que estás trabajando.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
            aria-label="Cerrar ajustes"
          >
            ✕
          </button>
        </div>

        <div className="mt-8 grid gap-2 overflow-y-auto pr-1">
          <label className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-sm font-medium text-slate-700">Nombre</span>
            <input
              value={name}
              onChange={(event) => updateName(event.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
            />
          </label>

          <label className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-sm font-medium text-slate-700">Moneda</span>
            <div className="select-arrow-wrapper relative">
              <select
                value={currency}
                onChange={(event) => updateCurrency(event.target.value as Currency)}
                className="w-full appearance-none rounded-3xl border border-slate-300 bg-white px-4 py-3 pr-11 text-slate-900 outline-none transition focus:border-slate-500"
              >
                {currencies.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label} ({item.symbol})
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="select-arrow pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-transform duration-200"
              >
                ▾
              </span>
            </div>
          </label>

          <label className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-sm font-medium text-slate-700">Peso (kg)</span>
            <input
              type="number"
              value={weight}
              onChange={(event) => {
                const nextWeight = Number(event.target.value);
                if (nextWeight >= 1) updateWeight(nextWeight);
              }}
              min={1}
              step={0.1}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
            />
            <p className="text-xs text-slate-500">Este peso se usará para estimar calorías en tus actividades físicas.</p>
          </label>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="w-2/3">
                <p className="text-sm font-medium text-slate-700">Hábitos</p>
                <p className="text-xs text-slate-500">Activa o desactiva los hábitos que quieres trabajar.</p>
              </div>
              <span className="text-xs uppercase tracking-[0.24em] text-slate-500">{categories.length} activos</span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {allHabits.map((habit) => {
                const active = categories.includes(habit.title);
                return (
                  <button
                    key={habit.title}
                    type="button"
                    onClick={() => toggleHabit(habit.title)}
                    className={`rounded-3xl border p-4 text-left transition ${
                      active
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-900 hover:border-slate-400"
                    }`}
                  >
                    <p className="font-semibold capitalize">{habit.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {active ? "Hábito activo" : "Agregar a tus hábitos"}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
