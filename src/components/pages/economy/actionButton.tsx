const actions: Record<ActionType, { label: string; textColor: string }> = {
  income: { label: "Agregar ingreso", textColor: "text-emerald-600" },
  expense: { label: "Agregar gasto", textColor: "text-rose-600" },
  saving: { label: "Agregar ahorro", textColor: "text-cyan-600" },
  withdrawal: { label: "Retiro de ahorro", textColor: "text-orange-600" },
  debt: { label: "Agregar deuda", textColor: "text-violet-600" },
  payDebt: { label: "Pagar deuda", textColor: "text-stone-600" },
};

export const ActionButton = ({
  aType,
  showModal,
}: {
  aType: ActionType;
  showModal: (t: ActionType) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => showModal(aType)}
      className={`rounded-3xl border border-slate-200 bg-white/80 px-3 py-2 text-sm font-medium transition hover:border-slate-300 hover:bg-slate-50 ${actions[aType].textColor} cursor-pointer`}
    >
      {actions[aType].label}
    </button>
  );
};
