import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useReadingContext } from "../../../contexts/useReadingContext";

interface Props {
  onClose: () => void;
}

export const AddBookModal = ({ onClose }: Props) => {
  const { addBook } = useReadingContext();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [alreadyRead, setAlreadyRead] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedPages = Number(totalPages);

    if (!name.trim() || !author.trim()) {
      toast.error("Completa el nombre y autor del libro.");
      return;
    }
    if (!parsedPages || parsedPages <= 0) {
      toast.error("Introduce un total de páginas válido.");
      return;
    }

    addBook({
      name: name.trim(),
      author: author.trim(),
      totalPages: parsedPages,
      currentPage: alreadyRead ? parsedPages : 0,
      completed: alreadyRead,
      startDate: new Date(`${startDate}T00:00:00`).toISOString(),
    });
    toast.success("Libro agregado correctamente.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-4xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Lectura</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Nuevo libro</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Añade un libro para seguir tu avance página a página.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200" aria-label="Cerrar modal">✕</button>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm text-slate-700"><span className="font-medium">Título</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="El nombre del libro" className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500" /></label>
          <label className="grid gap-2 text-sm text-slate-700"><span className="font-medium">Autor</span><input value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Nombre del autor" className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-700"><span className="font-medium">Páginas totales</span><input type="number" min="1" step="1" value={totalPages} onChange={(event) => setTotalPages(event.target.value)} placeholder="300" className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500" /></label>
            <label className="grid gap-2 text-sm text-slate-700"><span className="font-medium">Inicio</span><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500" /></label>
          </div>
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            <input type="checkbox" checked={alreadyRead} onChange={(event) => setAlreadyRead(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500" />
            <span>Ya lo leí</span>
          </label>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onClose} className="rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancelar</button><button type="submit" className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Guardar libro</button></div>
        </form>
      </div>
    </div>
  );
};
