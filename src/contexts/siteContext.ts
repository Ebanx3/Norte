import { createContext } from "react";

interface SiteContext {
    name:string
    updateName:(s:string)=>void

    weight:number
    updateWeight:(w:number)=>void

    currency: Currency
    updateCurrency:(currency: Currency)=>void

    categories:Category[]
    addCategory:(c:Category)=>void
    removeCategory:(c:Category)=>void

    goals: Goal[]
    addGoal:(g:Goal)=>void
    removeGoal:(gid:string)=>void
}

export const siteContext = createContext({} as SiteContext);