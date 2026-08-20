import { useEconomyContext } from "../../../contexts/useEconomyContext";
import { useSiteContext } from "../../../contexts/useSiteContext";
import { formatAmount } from "../../../utils/formatAmount";

export const TotalValuesSection = () => {
  const { getMovementsByType, getDebtsTotal, getSavingsTotal } =
    useEconomyContext();
  const { currency } = useSiteContext();

  const totalIncomes = getMovementsByType("income").reduce((acc, income) => acc + income.amount, 0);
  const totalExpenses = getMovementsByType("expense").reduce(
    (acc, expense) => acc + expense.amount,
    0,
  );

  const netSavings = getSavingsTotal();
  const debtTotal = getDebtsTotal();

  return (
    <section className="grid gap-4 grid-cols-2 sm:grid-cols-4 ">
      <div className="rounded-3xl bg-emerald-50 p-5 shadow-sm border border-emerald-200">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">
          Ingresos totales
        </p>
        <p className="mt-3 text-2xl font-semibold text-emerald-900 text-right">
          {formatAmount(totalIncomes, currency)}
        </p>
        <p className="mt-2 text-sm text-emerald-700">
          {getMovementsByType("income").length} registro{getMovementsByType("income").length === 1 ? "" : "s"}
        </p>
      </div>
      <div className="rounded-3xl bg-rose-50 p-5 shadow-sm border border-rose-200">
        <p className="text-xs uppercase tracking-[0.24em] text-rose-700">
          Gastos totales
        </p>
        <p className="mt-3 text-2xl font-semibold text-rose-900 text-right">
          {formatAmount(totalExpenses, currency)}
        </p>
        <p className="mt-2 text-sm text-rose-700">
          {getMovementsByType("expense").length} registro{getMovementsByType("expense").length === 1 ? "" : "s"}
        </p>
      </div>
      <div className="rounded-3xl bg-cyan-50 p-5 shadow-sm border border-cyan-200">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">
          Ahorros netos
        </p>
        <p className="mt-3 text-2xl font-semibold text-cyan-900 text-right">
          {formatAmount(netSavings, currency)}
        </p>
        <p className="mt-2 text-sm text-cyan-700">
          {getMovementsByType("saving").length} ingreso{getMovementsByType("saving").length === 1 ? "" : "s"}
        </p>
      </div>
      <div className="rounded-3xl bg-orange-50 p-5 shadow-sm border border-orange-200">
        <p className="text-xs uppercase tracking-[0.24em] text-orange-700">
          Deudas totales
        </p>
        <p className="mt-3 text-2xl font-semibold text-orange-900 text-right">
          {formatAmount(debtTotal, currency)}
        </p>
        <p className="mt-2 text-sm text-orange-700">
          {getMovementsByType("debt").length} deuda{getMovementsByType("debt").length === 1 ? "" : "s"}
        </p>
      </div>
    </section>
  );
};
