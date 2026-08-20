import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useMeditatingContext } from "../../../contexts/useMeditatingContext";

const sites: { value: MeditationSite; label: string }[] = [
  { value: "youtube", label: "YouTube" },
  { value: "spotify", label: "Spotify" },
  { value: "soundcloud", label: "SoundCloud" },
  { value: "insight_timer", label: "Insight Timer" },
  { value: "otro", label: "Otro" },
];

export const MeditationLinks = () => {
  const { links, addLink, removeLink } = useMeditatingContext();
  const [url, setUrl] = useState("");
  const [site, setSite] = useState<MeditationSite>("youtube");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      new URL(url);
    } catch {
      toast.error("Introduce un enlace válido.");
      return;
    }

    if (links.some((link) => link.url === url.trim())) {
      toast.error("Ese enlace ya está guardado.");
      return;
    }

    addLink({ url: url.trim(), site });
    setUrl("");
    toast.success("Enlace guardado correctamente.");
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Recursos</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Enlaces para meditar</h2>
      </div>
      <form className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]" onSubmit={handleSubmit}>
        <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://..." className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500" />
        <select value={site} onChange={(event) => setSite(event.target.value as MeditationSite)} className="appearance-none rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500">
          {sites.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <button type="submit" className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Guardar enlace</button>
      </form>
      {links.length > 0 ? (
        <div className="mt-5 grid gap-2">
          {links.map((link) => (
            <div key={link.url} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <a href={link.url} target="_blank" rel="noreferrer" className="min-w-0 truncate text-sm font-medium text-blue-600 hover:underline">{link.url}</a>
              <button type="button" onClick={() => removeLink(link.url)} className="shrink-0 text-xs font-semibold text-slate-500 hover:text-slate-900">Eliminar</button>
            </div>
          ))}
        </div>
      ) : <p className="mt-5 text-sm text-slate-600">Aún no tienes enlaces guardados.</p>}
    </section>
  );
};
