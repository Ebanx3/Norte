import { useEconomyContext } from "../../../../contexts/useEconomyContext";
import { useSiteContext } from "../../../../contexts/useSiteContext";
import { Block } from "./block";

export const EconomyBlock = () => {
  const { getBalance, getSavingsTotal, getDebtsTotal } = useEconomyContext();
  const { currency } = useSiteContext();

  const getSymbol = () => {
    switch (currency) {
      case "dolares":
        return "USD ";
      case "euros":
        return "€";
      default:
        return "$";
    }
  };

  const formatAmount = (amount: number) => `${getSymbol()}${amount}`;
  const balance = getBalance();
  const balanceStatus = balance >= 0 ? "Positivo" : "Déficit";

  return (
    <Block to={"/economia"} title={"economía"}>
      <div className="grid gap-4">
        <div className="rounded-3xl bg-slate-50 p-4 shadow-sm border border-slate-200">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Balance actual</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{formatAmount(balance)}</p>
          <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${balance >= 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
            {balanceStatus}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-emerald-50 p-4 shadow-sm border border-emerald-200 flex flex-col justify-between ">
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">Total ahorrado</p>
            <p className="mt-2 text-xl font-semibold text-emerald-900 ml-auto">{formatAmount(getSavingsTotal())}</p>
          </div>
          <div className="rounded-3xl bg-rose-50 p-4 shadow-sm border border-rose-200 flex flex-col justify-between ">
            <p className="text-xs uppercase tracking-[0.24em] text-rose-700">Deuda total</p>
            <p className="mt-2 text-xl font-semibold text-rose-900 ml-auto">{formatAmount(getDebtsTotal())}</p>
          </div>
        </div>
      </div>
    </Block>
  );
};