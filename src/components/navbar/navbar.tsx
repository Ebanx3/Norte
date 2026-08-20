import { useState } from "react";
import { Link } from "react-router-dom";
import { SettingIcon } from "../../assets/settingsIcon";
import { useSiteContext } from "../../contexts/useSiteContext";
import { SettingsModal } from "./settingsModal";

export const NavBar = () => {
  const { name } = useSiteContext();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <nav className="mx-auto max-w-6xl flex items-center justify-between rounded-b-4xl border-b border-slate-200 bg-white px-6 py-2 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Bienvenido</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">Hola {name !== "" ? name : "invitado"}</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            aria-label="Volver al inicio"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <span aria-hidden="true">⌂</span>
            Inicio
          </Link>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            aria-label="Ajustes"
            className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
          >
            <SettingIcon />
          </button>
        </div>
      </nav>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};
