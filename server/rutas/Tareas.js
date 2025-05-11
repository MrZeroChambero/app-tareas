const express = require("express");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tareas",
});
const routerTareas = express.Router();

routerTareas.post("/Crear", (req, res) => {
  const body = req.body;
  const Id_Tarea = body.id;
  const Tarea = body.Tarea;
  const Hora = body.Hora;
  const Fecha = body.Fecha;
  const Estado = 0;
  console.log(body);

  db.query(
    "INSERT INTO tareas ( Tarea,Fecha,Hora,Estado) VALUES(?,?,?,?)",
    [Tarea, Fecha, Hora, Estado],
    (err, result) => {
      if (err) {
        res.send(false);
        console.log(err);
      } else {
        console.log("gg ez no tin");
        res.send(true);
      }
    }
  );
});
routerTareas.post("/", (req, res) => {
  db.query("SELECT * FROM tareas", (err, result) => {
    if (err === true) {
      console.log(err);
    } else {
      res.send(result);
      console.log("Mostrar Tareas");
    }
  });
});

routerTareas.post("/Buscar", (req, res) => {
  const Id = req.body.id;
  // const id_Personal = 5;
  console.log("id" + req.body.id);
  db.query("SELECT * FROM tareas WHERE id =?", [Id], (err, result) => {
    if (err === true) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

routerTareas.post("/Actualizar", (req, res) => {
  const body = req.body;
  console.log("actualizar");
  console.log("datos body");

  const Id_Tarea = body.id;
  const Tarea = body.Tarea;
  const Hora = body.Hora;
  const Fecha = body.Fecha;
  const Estado = 0;

  db.query(
    "UPDATE tareas SET tarea=?, Fecha=?, Hora=?, Estado=? WHERE tareas.id = ?",
    [Tarea, Fecha, Hora, Estado, Id_Tarea],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send(true);
      }
    }
  );
});

routerTareas.post("/Eliminar", (req, res) => {
  const id = req.body.id;
  console.log(req.body);
  console.log("id" + id);
  db.query("DELETE FROM tareas WHERE tareas.id = ?", [id], (err, result) => {
    if (err === true) {
      console.log(err);
    } else {
      console.log("Tarea Eliminada");
      res.send(result);
    }
  });
});

module.exports = routerTareas;
