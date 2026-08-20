interface Props {
  balance: string;
  balanceStatus: string;
}

export const Summary = ({ balance, balanceStatus }: Props) => {
  return (
    <section className="rounded-4xl bg-white p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.18)] border border-slate-200">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
            Economía
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Resumen financiero
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Visualiza tus ingresos, gastos, deudas y ahorros en un solo lugar.
            Aquí tienes la información actualizada desde tu contexto de
            economía.
          </p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-6 text-slate-900 shadow-sm border border-slate-200">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Balance actual
          </p>
          <p className="mt-2 text-3xl font-semibold text-right">{balance}</p>
          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${balanceStatus === "positivo" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}
          >
            {balanceStatus}
          </span>
        </div>
      </div>
    </section>
  );
};
