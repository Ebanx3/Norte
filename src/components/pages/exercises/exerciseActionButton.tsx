interface Props {
  onClick: () => void;
}

export const ExerciseActionButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
    >
      <span aria-hidden="true" className="text-lg leading-none">+</span>
      Agregar actividad
    </button>
  );
};
