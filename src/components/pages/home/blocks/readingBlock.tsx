import { Block } from "./block";
import { useReadingContext } from "../../../../contexts/useReadingContext";

export const ReadingBlock = () => {
  const { getLastMonthActivities, books, activities, getCompletedBooks } = useReadingContext();

  const monthActivities = getLastMonthActivities();

  const getUniqueDays = (items: ReadingActivity[]) => {
    const setDates = new Set(items.map((a) => new Date(a.date).toDateString()));
    return setDates.size;
  };

  const monthDays = getUniqueDays(monthActivities);

  const completedCount = getCompletedBooks().length;
  const completedBooks = books.filter((b) => b.completed);
  const lastCompletedBook = completedBooks.slice().sort((a, b) => +new Date(b.startDate) - +new Date(a.startDate))[0];

  // Libro actual: priorizar libros en progreso con actividad reciente, luego por startDate
  const inProgress = books.filter((b) => !b.completed);
  let currentBook: Book | undefined;
  if (inProgress.length > 0) {
    const recentActivity = activities.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date)).find((a) => inProgress.some((b) => b.id === a.bookId));
    if (recentActivity) currentBook = inProgress.find((b) => b.id === recentActivity.bookId);
    if (!currentBook) currentBook = inProgress.slice().sort((a, b) => +new Date(b.startDate) - +new Date(a.startDate))[0];
  } else {
    // si no hay en progreso, mostrar el último completado como fallback
    currentBook = lastCompletedBook;
  }

  const progressPercent = currentBook && currentBook.totalPages > 0 ? Math.round((currentBook.currentPage / currentBook.totalPages) * 100) : 0;

  return (
    <Block title="lectura" to="/lectura">
      <div className="grid gap-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          {currentBook ? (
            <>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Libro actual</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{currentBook.name}</p>
              <p className="text-sm text-slate-600">{currentBook.author}</p>
              <div className="mt-4">
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div className="h-3 rounded-full bg-blue-600" style={{ width: `${progressPercent}%` }} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{currentBook.currentPage}/{currentBook.totalPages} pgs • {progressPercent}%</p>
              </div>
            </>
          ) : (
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Libro actual</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">Sin libro activo</p>
              <p className="text-sm text-slate-600 mt-1">Añade un libro para empezar a registrar tu progreso.</p>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-blue-50 p-4 shadow-sm border border-blue-200 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-[0.24em] text-blue-700">Días de actividad</p>
            <div className="mt-2">
              <p className="text-sm text-slate-600">Último mes</p>
              <p className="mt-1 text-2xl font-semibold text-blue-900">{monthDays} días</p>
            </div>
          </div>
          <div className="rounded-3xl bg-emerald-50 p-4 shadow-sm border border-emerald-200 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">Libros completados</p>
            <p className="mt-2 text-xl font-semibold text-emerald-900 ml-auto">{completedCount}</p>
          </div>
        </div>
      </div>
    </Block>
  );
};