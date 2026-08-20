import { ActionButton } from "./actionButton";

export const EconomyActionButtons = ({showModal}:{showModal:(t:ActionType)=>void}) => {
  const actions:ActionType[] = ["income",'expense',"debt","payDebt","saving","withdrawal"]
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
       {actions.map((a)=><ActionButton key={a} aType={a} showModal={showModal}/> )}
    </div>
  );
};
