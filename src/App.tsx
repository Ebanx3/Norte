import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "./components/pages/home/home";
import { NavBar } from "./components/navbar/navbar";
import { Economy } from "./components/pages/economy/economy";
import { Exercises } from "./components/pages/exercises/exercises";
import { Meditating } from "./components/pages/meditating/meditating";
import { Reading } from "./components/pages/reading/reading";
import { ContextsProviders } from "./contexts/contextsProviders";

export const App = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <BrowserRouter>
        <ContextsProviders>
          <ToastContainer />
          <Routes>
            <Route
              element={
                <>
                  <NavBar />
                  <Outlet />
                </>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/economia" element={<Economy />} />
              <Route path="/actividad_fisica" element={<Exercises />} />
              <Route path="/meditacion" element={<Meditating />} />
              <Route path="/lectura" element={<Reading />} />
            </Route>
          </Routes>
        </ContextsProviders>
      </BrowserRouter>
    </main>
  );
};
