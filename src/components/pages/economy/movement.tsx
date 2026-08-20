import { formatAmount } from "../../../utils/formatAmount";
import { formatDate } from "../../../utils/formatDate";

interface Props {
  movement: Movement;
  removeMovement: (id: string) => void;
  currency: Currency;
}

const movementLabels: Record<MovementType, string> = {
  expense: "Gasto",
  income: "Ingreso",
  saving: "Ahorro",
  withdrawal: "Retiro de ahorro",
  debt: "Deuda",
  payDebt: "Pago de deuda",
};

const movementStyles: Record<MovementType, string> = {
  expense: "border-l-rose-500 text-rose-600",
  income: "border-l-emerald-500 text-emerald-600",
  saving: "border-l-cyan-500 text-cyan-600",
  withdrawal: "border-l-orange-500 text-orange-600",
  debt: "border-l-violet-500 text-violet-600",
  payDebt: "border-l-violet-500 text-violet-600",
};


export const Movement = ({ movement, removeMovement, currency }: Props) => {
  return (
    <div
      key={movement.id}
      className={`rounded-3xl border border-slate-200 border-l-4 bg-slate-50 p-4 ${movementStyles[movement.type]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-current/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]">
              {movementLabels[movement.type]}
            </span>
            <p className="text-lg font-semibold text-slate-900">
              {formatAmount(movement.amount, currency)}
            </p>
          </div>
          <p className="mt-2 text-sm font-semibold text-stone-800">
            {movement.tag || "Sin concepto"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {formatDate(movement.date)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => removeMovement(movement.id)}
          className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
