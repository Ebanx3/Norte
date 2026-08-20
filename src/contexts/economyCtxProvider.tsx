import { useEffect, useState, type ReactNode } from "react";
import { economyContext } from "./economyContext";
import { v4 as uuid } from "uuid";

export const EconomyContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [movements, setMovements] = useState<Movement[]>(
    JSON.parse(localStorage.getItem("movements") || "[]"),
  )

  const getMovementsByType = (type?: MovementType) => {
    if (!type) return movements;
    return movements.filter((movement) => movement.type === type);
  }

  const addMovement = (movement: Omit<Movement, "date" | "id" >) => {
    const newMovement: Movement = {
      ...movement,
      id: uuid(),
      date: new Date().toLocaleString(),
    };
    setMovements([...movements, newMovement]);
  };

  const removeMovement = (eid: string) => {
    setMovements((current) => current.filter((movement) => movement.id !== eid));
  };

  const updateDebt = ({
    debtId,
    amount,
    action,
  }: {
    debtId: string;
    amount: number;
    action: DebtAction;
  }) => {
    setMovements((current) =>
      current.flatMap((movement) => {
        if (movement.id !== debtId || movement.type !== "debt") {
          return [movement];
        }

        const updatedAmount =
          action === "increase" ? movement.amount + amount : movement.amount - amount;

        return updatedAmount > 0 ? [{ ...movement, amount: updatedAmount }] : [];
      }),
    );
  };

  const getBalance = () => {
    const totalIncomes = movements
      .filter((m) => m.type === "income")
      .reduce((acc, income) => acc + income.amount, 0);
    const totalExpenses = movements
      .filter((m) => m.type === "expense")
      .reduce((acc, expense) => acc + expense.amount, 0);
    const totalSavings = movements
      .filter((m) => m.type === "saving")
      .reduce((acc, saving) => acc + saving.amount, 0);
    const totalWithdrawals = movements
      .filter((m) => m.type === "withdrawal")
      .reduce((acc, withdrawal) => acc + withdrawal.amount, 0);
    const totalDebtPayments = movements
      .filter((m) => m.type === "payDebt")
      .reduce((acc, payment) => acc + payment.amount, 0);

    return totalIncomes - totalExpenses - totalSavings + totalWithdrawals - totalDebtPayments;
  };

  const getDebtsTotal = () => {
    return movements
      .filter((m) => m.type === "debt")
      .reduce((acc, debt) => acc + debt.amount, 0);
  };

  const getSavingsTotal = () => {
    const totalSavings = movements
      .filter((m) => m.type === "saving")
      .reduce((acc, saving) => acc + saving.amount, 0);
    const totalWithdrawals = movements
      .filter((m) => m.type === "withdrawal")
      .reduce((acc, withdrawal) => acc + withdrawal.amount, 0);
    return totalSavings - totalWithdrawals;
  };

  // Guardar cada vez que cambien
  useEffect(() => {
    localStorage.setItem("movements", JSON.stringify(movements));
  }, [movements]);

  return (
    <economyContext.Provider
      value={{
        movements,
        addMovement,
        removeMovement,
        getMovementsByType,
        updateDebt,
        getBalance,
        getDebtsTotal,
        getSavingsTotal,
      }}
    >
      {children}
    </economyContext.Provider>
  );
};
