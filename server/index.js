const express = require("express");
const app = express();
const Puerto = 3001;
const mysql = require("mysql");
const cors = require("cors");
const eventos = [
  {
    id: 1,
    title: "Evento 1",
    start: new Date(2014, 4, 10, 10, 0), // Fecha y hora de inicio
    end: new Date(2024, 4, 10, 12, 0), // Fecha y hora de finalización
  },
  // ...otros eventos
];
const eventosFiltrados = eventos.filter((evento) => {
  const dayOfWeek = evento.start.getDay();
  return dayOfWeek !== 1 && dayOfWeek !== 6; // Excluye lunes y sábados
});

//console.dir(eventos);
console.dir(JSON.stringify(eventosFiltrados));

app.use(express.json());
app.use(cors());

app.listen(Puerto, () => {
  console.log("puerto 3001");
});
const routerTareas = require("./rutas/Tareas.js");
const routerMaterias = require("./rutas/Materias.js");

app.use("/Materias", routerMaterias);
app.use("/Tareas", routerTareas);

// es necesario instalar los cors para realizar consultas
