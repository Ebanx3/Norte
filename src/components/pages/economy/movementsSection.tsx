import { useState } from "react";
import { useEconomyContext } from "../../../contexts/useEconomyContext";
import { useSiteContext } from "../../../contexts/useSiteContext";
import { orderByDateDesc } from "../../../utils/orderDateDesc";
import { FilterButton } from "./filterButton";
import { Movement } from "./movement";

export const MovementsSection = () => {
  const { currency } = useSiteContext();
  const {
    getMovementsByType,
    removeMovement,
  } = useEconomyContext();
  const [filter, setFilter] = useState<"todos" | "ahorro" | "deudas">("todos");

  const allMovements = [...getMovementsByType("expense"), ...getMovementsByType("income"), ...getMovementsByType("saving"), ...getMovementsByType("withdrawal"),...getMovementsByType("debt"), ...getMovementsByType("payDebt")];
  const debtsMovements = [...getMovementsByType("debt")];
  const savingMovements = [...getMovementsByType("saving"), ...getMovementsByType("withdrawal")]
  const filteredMovements = () => {
    switch (filter) {
      case "todos":
        return orderByDateDesc(allMovements).slice(0, 8);
      case "ahorro":
        return orderByDateDesc(savingMovements).slice(0, 8);
      case "deudas":
        return orderByDateDesc(debtsMovements).slice(0, 8);
      default:
        return orderByDateDesc(allMovements).slice(0, 8);
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between gap-4">
        <b className="text-xs uppercase tracking-[0.24em] text-slate-500">
          Movmientos
        </b>
        <div className="flex gap-4">
          <FilterButton filter="todos" setFilter={() => setFilter("todos")} activeFilter={filter} />
          <FilterButton filter="ahorro" setFilter={() => setFilter("ahorro")} activeFilter={filter} />
          <FilterButton filter="deudas" setFilter={() => setFilter("deudas")} activeFilter={filter} />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600">
        Ultimos movimientos registrados.
      </p>
      <div className="mt-5 grid gap-3">
        {filteredMovements().length > 0 ? (
          filteredMovements().map((movement) => (
            <Movement
              key={movement.id}
              movement={movement}
              removeMovement={
                removeMovement
              }
              currency={currency}
            />
          ))
        ) : (
          <p className="text-sm text-slate-600">
            No hay deudas registradas todavía.
          </p>
        )}
      </div>
    </div>
  );
};
