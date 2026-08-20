import { useState } from "react";
import { useEconomyContext } from "../../../contexts/useEconomyContext";
import { useSiteContext } from "../../../contexts/useSiteContext";
import { formatAmount } from "../../../utils/formatAmount";
import { EconomyActionButtons } from "./economyActionButtons";
import { Summary } from "./summary";
import { AddACtivityModal } from "./addNewActivityModal";
import { TotalValuesSection } from "./totalValuesSection";
import { MovementsSection } from "./movementsSection";

export const Economy = () => {
  const [activityModal, setActivityModal] = useState<ActionType | null>(null);

  const { getBalance } = useEconomyContext();

  const { currency } = useSiteContext();

  const balance = getBalance();
  const showActivityModal = (t: ActionType) => {
    setActivityModal(t);
  };

  return (
    <>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-4 sm:p-6">
        <Summary
          balance={formatAmount(balance, currency)}
          balanceStatus={balance >= 0 ? "positivo" : "negativo"}
        />
        <EconomyActionButtons showModal={showActivityModal} />
        <TotalValuesSection />

        <MovementsSection />
      </div>

      {activityModal !== null && (
        <AddACtivityModal
          onClose={() => setActivityModal(null)}
          actionType={activityModal}
        />
      )}
    </>
  );
};
