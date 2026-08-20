import { formatDate } from "../../../utils/formatDate";

interface Props {
  activity: ReadingActivity;
  bookName: string;
  onRemove: (id: string) => void;
}

export const ReadingActivityItem = ({ activity, bookName, onRemove }: Props) => <article className="rounded-3xl border border-slate-200 border-l-4 border-l-emerald-500 bg-slate-50 p-4"><div className="flex items-start justify-between gap-4"><div><p className="text-lg font-semibold text-slate-900">{activity.pagesRead} páginas</p><p className="mt-1 text-sm text-slate-600">{bookName} · {activity.duration} minutos</p><p className="mt-1 text-xs text-slate-500">{formatDate(activity.date)}</p></div><button type="button" onClick={() => onRemove(activity.id)} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-900">Eliminar</button></div></article>;
