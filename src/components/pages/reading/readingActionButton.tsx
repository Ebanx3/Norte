interface Props {
  label: string;
  onClick: () => void;
  secondary?: boolean;
}

export const ReadingActionButton = ({ label, onClick, secondary = false }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-3xl px-5 py-3 text-sm font-semibold transition ${secondary ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50" : "bg-slate-900 text-white hover:bg-slate-700"}`}
    >
      <span aria-hidden="true" className="text-lg leading-none">+</span>
      {label}
    </button>
  );
};
