import { createContext } from "react";

interface EconomyContext {
    movements: Movement[]

    addMovement:(e:Omit<Movement,"date"|"id">)=>void
    removeMovement:(eid:string)=>void

    updateDebt:({debtId, amount, action}:{debtId:string, amount:number, action:DebtAction})=>void

    getBalance:()=>number
    getDebtsTotal:()=>number
    getSavingsTotal:()=>number

    getMovementsByType:(type?:MovementType)=>Movement[]
}

export const economyContext = createContext({} as EconomyContext);