interface Props {
  filter: "todos" | "ahorro" | "deudas";
  setFilter: VoidFunction;
  activeFilter: "todos" | "ahorro" | "deudas";
}

export const FilterButton = ({ filter, setFilter, activeFilter }: Props) => {
  return (
    <button
      className={`text-xs font-bold border rounded-full border-stone-300 uppercase px-2 py-1 ${activeFilter === filter ? "text-stone-300" : "text-stone-600 hover:bg-stone-300 cursor-pointer"}`}
      onClick={setFilter}
    >
      {filter}
    </button>
  );
};
