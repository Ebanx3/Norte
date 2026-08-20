import { useState } from "react";
import { useSiteContext } from "../../../contexts/useSiteContext";
import { useEconomyContext } from "../../../contexts/useEconomyContext";
import Select from "react-select";
import { getCurrencySymbol } from "../../../utils/formatAmount";
import { toast } from 'react-toastify';

const ACTION_LABELS: Record<ActionType, string> = {
  expense: "Gasto",
  income: "Ingreso",
  saving: "Ahorro",
  withdrawal: "Retiro",
  debt: "Deuda",
  payDebt: "Pago deuda",
};

const ACTION_HELPERS: Record<ActionType, string> = {
  expense: "Registra un gasto con su valor y un concepto.",
  income: "Registra un ingreso con su valor y su origen.",
  saving: "Registra un ahorro con el monto que apartaste.",
  withdrawal: "Registra un retiro de tus ahorros.",
  debt: "Registra una deuda con su monto y descripción.",
  payDebt: "Registra un pago a una deuda",
};

export const AddACtivityModal = ({
  actionType,
  onClose,
}: {
  actionType: ActionType;
  onClose: VoidFunction;
}) => {
  const [amount, setAmount] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [selectedDebtId, setSelectedDebtId] = useState<string>("");
  const actionLabel = ACTION_LABELS[actionType];
  const helper = ACTION_HELPERS[actionType];

  const { currency } = useSiteContext();
  const {
    addMovement,
    getMovementsByType,
    getBalance,
    getSavingsTotal,
    updateDebt,
  } = useEconomyContext();

  const onSubmit = ({
    amount,
    tag,
  }: {
    amount: number;
    tag: string | undefined;
  }) => {
    switch (actionType) {
       case "income":
        addMovement({ amount, tag: tag!, type: "income" });
        break;
      case "expense":
        addMovement({ amount, tag: tag!, type: "expense" });
        break;
      case "debt":
        addMovement({ amount, tag: tag!, type: "debt" });
        break;
      case "payDebt":
        const debt = getMovementsByType("debt").find(
          (movement) => movement.id === selectedDebtId,
        );
        addMovement({ amount, tag: debt!.tag , type: "payDebt" });
        updateDebt({ debtId: selectedDebtId, amount, action: "payment" });
        break;
      case "saving":
        addMovement({ amount, tag: "Nuevo ahorro", type: "saving" });
        break;
      case "withdrawal":
        addMovement({ amount, tag: "Retiro de ahorros", type: "withdrawal" });
        break;
      default:
        return;
    }
  };

  const showTagField =
    actionType === "expense" ||
    actionType === "income" ||
    actionType === "debt";

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Introduce un importe válido mayor a 0.");
      return;
    }

    if (actionType === "expense" && parsedAmount > getBalance()) {
      toast.error("El importe supera tu balance actual.");
      return;
    }

    if (actionType === "saving" && parsedAmount > getBalance()) {
      toast.error("No tienes suficiente balance para agregar este ahorro.");
      return;
    }

    if (actionType === "payDebt") {
      const debt = getMovementsByType("debt").find(
        (movement) => movement.id === selectedDebtId,
      );

      if (!debt) {
        toast.error("Selecciona una deuda para pagar.");
        return;
      }

      if (parsedAmount > debt.amount) {
        toast.error("El importe no puede superar el valor de la deuda.");
        return;
      }

      if (parsedAmount > getBalance()) {
        toast.error("No tienes suficiente balance para pagar esta deuda.");
        return;
      }
    }

    if (actionType === "withdrawal" && parsedAmount > getSavingsTotal()) {
      toast.error("El importe supera tus ahorros disponibles.");
      return;
    }

    if (showTagField && !tag.trim()) {
      toast.error("Añade una etiqueta o concepto para esta entrada.");
      return;
    }

    onSubmit({
      amount: parsedAmount,
      tag: showTagField ? tag.trim() : undefined,
    });
    toast.success(`${actionLabel} añadido correctamente.`);
    onClose();
  };

  const selectOptions = [...getMovementsByType("debt")].map((debt) => {
    return { value: debt.id, label: `${debt.tag} (${getCurrencySymbol(currency) }${debt.amount})` };
  });

  return (
    <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm flex justify-center items-center">
      <div className="w-full max-w-lg rounded-4xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
              Agregar {actionLabel.toLowerCase()}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Nuevo {actionLabel.toLowerCase()}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{helper}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm text-slate-700">
            <span className="font-medium">Importe</span>
            <div className="flex items-center gap-2 rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3">
              <span className="text-slate-500">
                {currency === "dolares"
                  ? "USD"
                  : currency === "euros"
                    ? "€"
                    : "$"}
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent text-slate-900 outline-none"
              />
            </div>
          </label>

          {showTagField ? (
            <label className="grid gap-2 text-sm text-slate-700">
              <span className="font-medium">Etiqueta</span>
              <input
                value={tag}
                onChange={(event) => setTag(event.target.value)}
                placeholder={
                  actionType === "income"
                    ? "Salario, freelance..."
                    : actionType === "expense"
                      ? "Comida, transporte..."
                      : "Descripción de la deuda"
                }
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
              />
            </label>
          ) : null}

          {actionType === "payDebt" && (
            <label className="grid gap-2 text-sm text-slate-700">
              <span className="font-medium">Selecciona deuda</span>
              {getMovementsByType("debt").length === 0 ? (
                <option>No tienes deudas registradas para pagar</option>
              ) : (
                <Select
                  options={selectOptions}
                  unstyled
                  onChange={(option) => setSelectedDebtId(option?.value || "")}
                  classNames={{
                    control: ({ isFocused }) =>
                      `group rounded-3xl border bg-slate-50 px-4 py-3 ${
                        isFocused ? "border-slate-500" : "border-slate-300"
                      }`,
                    menu: () =>
                      "mt-2 rounded-xl border border-slate-200 bg-white shadow-lg",
                    option: ({ isFocused, isSelected }) =>
                      `px-4 py-2 cursor-pointer ${
                        isSelected
                          ? "bg-slate-200"
                          : isFocused
                            ? "bg-slate-100"
                            : ""
                      }`,
                    placeholder: () => "text-slate-400",
                    singleValue: () => "text-slate-900",
                    input: () => "text-slate-900",
                    dropdownIndicator: () => "select-dropdown-indicator text-slate-500 transition-transform duration-200",
                  }}
                />
              )}
            </label>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Añadir {actionLabel.toLowerCase()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
