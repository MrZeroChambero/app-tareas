// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { App } from "./App.jsx";

import { Tareas } from "./componentes/tareas.jsx";
import { Calendario } from "./componentes/calendario.jsx";
import { Materias } from "./componentes/materias.jsx";

const Home = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tareas />} />
        <Route path="/Tareas" element={<Tareas />} />
        <Route path="/Calendario" element={<Calendario />} />
        <Route path="/Materias" element={<Materias />} />
        <Route path="*" element={<Navigate to="/" />} />{" "}
        {/* Redirección para rutas no definidas */}
      </Routes>
    </Router>
  );
};

export { Home };
