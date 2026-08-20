interface Props {
  book: Book;
  onRemove: (id: string) => void;
}

export const BookItem = ({ book, onRemove }: Props) => {
  const progress = book.totalPages > 0 ? Math.round((book.currentPage / book.totalPages) * 100) : 0;
  return <article className="rounded-3xl border border-slate-200 border-l-4 border-l-blue-500 bg-slate-50 p-5"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-semibold text-slate-900">{book.name}</h3>{book.completed ? <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">Completado</span> : null}</div><p className="mt-1 text-sm text-slate-600">{book.author}</p><div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-2 flex justify-between text-xs text-slate-500"><span>{book.currentPage} de {book.totalPages} páginas</span><span>{progress}%</span></div></div><button type="button" onClick={() => onRemove(book.id)} className="shrink-0 rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-900">Eliminar</button></div></article>;
};
