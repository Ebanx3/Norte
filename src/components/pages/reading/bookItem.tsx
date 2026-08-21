interface Props {
  book: Book;
  onRemove: (id: string) => void;
}

export const BookItem = ({ book, onRemove }: Props) => {
  const progress =
    book.totalPages > 0
      ? Math.round((book.currentPage / book.totalPages) * 100)
      : 0;
  const isCompleted = book.completed;

  return (
    <article
      className={[
        "rounded-3xl border border-slate-200 bg-slate-50 transition-all",
        isCompleted
          ? "border-l-4 border-l-emerald-500 p-3.5"
          : "border-l-4 border-l-blue-500 p-5",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
              {book.name}
            </h3>
            {isCompleted ? (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                Completado
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">{book.author}</p>

          {isCompleted ? (
            <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-slate-500">
              <span>{book.totalPages} páginas</span>
              <span className="font-semibold text-emerald-700">100%</span>
            </div>
          ) : (
            <div className="mt-3 w-full max-w-[260px]">
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>
                  {book.currentPage} de {book.totalPages} páginas
                </span>
                <span>{progress}%</span>
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => onRemove(book.id)}
          className="shrink-0 rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};
