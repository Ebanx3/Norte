import { useState } from "react";
import { toast } from "react-toastify";
import { useReadingContext } from "../../../contexts/useReadingContext";
import { AdviceCarousel } from "../../ui/AdviceCarousel";
import { AddBookModal } from "./addBookModal";
import { AddReadingActivityModal } from "./addReadingActivityModal";
import { BookItem } from "./bookItem";
import { ReadingActionButton } from "./readingActionButton";
import { ReadingActivityItem } from "./readingActivityItem";
import { ReadingSummary } from "./readingSummary";

export const Reading = () => {
  const [modal, setModal] = useState<"book" | "activity" | null>(null);
  const {
    books,
    activities,
    removeBook,
    removeActivity,
    getCompletedBooks,
    getReadingBooks,
    getTotalPagesRead,
    getLastWeekActivities,
    getLastMonthActivities,
  } = useReadingContext();

  const sortedBooks = [...books]
    .map((book, index) => ({ book, index }))
    .sort((first, second) => {
      if (first.book.completed !== second.book.completed) {
        return Number(first.book.completed) - Number(second.book.completed);
      }

      return second.index - first.index;
    })
    .map(({ book }) => book);
  const sortedActivities = [...activities].sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
  const removeBookWithToast = (bookId: string) => {
    removeBook(bookId);
    toast.success("Libro eliminado correctamente.");
  };
  const removeActivityWithToast = (activityId: string) => {
    removeActivity(activityId);
    toast.success("Actividad de lectura eliminada correctamente.");
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-61px)] max-w-6xl flex-col gap-6 p-4 sm:p-6">
      <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
              Lectura
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Tu camino entre páginas
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Organiza tus libros y registra cada sesión para ver cómo crece tu
              avance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ReadingActionButton
              label="Agregar libro"
              onClick={() => setModal("book")}
            />
            <ReadingActionButton
              label="Registrar lectura"
              onClick={() => setModal("activity")}
              secondary
            />
          </div>
        </div>
      </section>

      <ReadingSummary
        pagesRead={getTotalPagesRead()}
        weekActivities={getLastWeekActivities().length}
        monthActivities={getLastMonthActivities().length}
        completedBooks={getCompletedBooks().length}
      />

      <AdviceCarousel />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Biblioteca
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Mis libros
            </h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {getReadingBooks().length} en progreso
          </span>
        </div>
        <div className="mt-5 grid gap-3">
          {sortedBooks.length > 0 ? (
            sortedBooks.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                onRemove={removeBookWithToast}
              />
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="font-semibold text-slate-900">
                Tu biblioteca está vacía
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Agrega un libro para empezar a registrar tu progreso.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Historial
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Sesiones de lectura
            </h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {activities.length} sesión{activities.length === 1 ? "" : "es"}
          </span>
        </div>
        <div className="mt-5 grid gap-3">
          {sortedActivities.length > 0 ? (
            sortedActivities.map((activity) => (
              <ReadingActivityItem
                key={activity.id}
                activity={activity}
                bookName={
                  books.find((book) => book.id === activity.bookId)?.name ??
                  "Libro eliminado"
                }
                onRemove={removeActivityWithToast}
              />
            ))
          ) : (
            <p className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
              Todavía no hay sesiones de lectura.
            </p>
          )}
        </div>
      </section>

      {modal === "book" ? (
        <AddBookModal onClose={() => setModal(null)} />
      ) : null}
      {modal === "activity" ? (
        <AddReadingActivityModal onClose={() => setModal(null)} />
      ) : null}
    </div>
  );
};
