import type { ReactNode } from "react";
import { Link } from "react-router-dom";


interface Props {
    to:string
    title:Category
    children:ReactNode
}

export const Block = ({to,title,children}:Props) => {

    const getClassName = () => {
        const base = "rounded-[26px] p-6 flex flex-col gap-4 justify-between bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.25)] transition-transform duration-300 hover:-translate-y-1";
        switch (title){
            case "actividad fisica":
                return base + " border-l-2 border-orange-500";
            case "economía":
                return base + " border-l-2 border-green-500";
            case "meditación":
                return base + " border-l-2 border-violet-500";
            case "lectura":
                return base + " border-l-2 border-blue-500";
            case "alimentación":
                return base + " border-l-2 border-red-500";
            default:
                return base + " border-l-2 border-slate-300 text-slate-800";
        }
    }

  return (
    <Link to={to} className={ `flex flex-col min-w-75 ${getClassName()}`}>
        <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-current opacity-90" />
            <h1 className="capitalize text-lg font-semibold tracking-wide text-slate-900">{title}</h1>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-600">
            {children}
        </div>
    </Link>
  );
};