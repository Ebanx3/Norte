import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useReadingContext } from "../../../contexts/useReadingContext";

interface Props {
  onClose: () => void;
}

export const AddReadingActivityModal = ({ onClose }: Props) => {
  const { books, addActivity } = useReadingContext();
  const readingBooks = books.filter((book) => !book.completed);
  const [bookId, setBookId] = useState(readingBooks[0]?.id ?? "");
  const [pagesRead, setPagesRead] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const book = readingBooks.find((item) => item.id === bookId);
    const parsedPages = Number(pagesRead);
    const parsedDuration = Number(duration);

    if (!book) {
      toast.error("Selecciona un libro en progreso.");
      return;
    }
    if (!parsedPages || parsedPages <= 0 || parsedPages > book.totalPages - book.currentPage) {
      toast.error("Las páginas deben estar dentro del progreso pendiente del libro.");
      return;
    }
    if (!parsedDuration || parsedDuration <= 0) {
      toast.error("Introduce una duración válida mayor a 0 minutos.");
      return;
    }

    addActivity({
      bookId,
      pagesRead: parsedPages,
      duration: parsedDuration,
      date: new Date().toISOString(),
    });
    toast.success("Lectura registrada correctamente.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-4xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.32em] text-slate-500">Lectura</p><h2 className="mt-2 text-2xl font-semibold text-slate-900">Registrar lectura</h2><p className="mt-2 text-sm leading-6 text-slate-600">Anota el avance de tu sesión para actualizar el libro.</p></div><button type="button" onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200" aria-label="Cerrar modal">✕</button></div>
        {readingBooks.length > 0 ? <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm text-slate-700"><span className="font-medium">Libro</span><select value={bookId} onChange={(event) => setBookId(event.target.value)} className="w-full appearance-none rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500">{readingBooks.map((book) => <option key={book.id} value={book.id}>{book.name} · {book.currentPage}/{book.totalPages} páginas</option>)}</select></label>
          <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm text-slate-700"><span className="font-medium">Páginas leídas</span><input type="number" min="1" step="1" value={pagesRead} onChange={(event) => setPagesRead(event.target.value)} placeholder="20" className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500" /></label><label className="grid gap-2 text-sm text-slate-700"><span className="font-medium">Duración (minutos)</span><input type="number" min="1" step="1" value={duration} onChange={(event) => setDuration(event.target.value)} placeholder="30" className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500" /></label></div>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onClose} className="rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancelar</button><button type="submit" className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Guardar lectura</button></div>
        </form> : <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center"><p className="font-semibold text-slate-900">No hay libros en progreso</p><p className="mt-2 text-sm text-slate-600">Agrega un libro antes de registrar una lectura.</p><button type="button" onClick={onClose} className="mt-4 rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Cerrar</button></div>}
      </div>
    </div>
  );
};
