const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tareas",
});

const routerMaterias = express.Router();
const crypto = require("crypto");
const { off } = require("process");

// Ejemplo: Generar un ID aleatorio (UUID v4)
function generateRandomId() {
  return crypto.randomUUID();
}
routerMaterias.post("/Crear", (req, res) => {
  const body = req.body;
  const Materia = body.Materia;
  const Dias = body.Dias;
  const Hora = body.Horas;
  const FechaI = body.FechaI;
  const FechaF = body.FechaF;

  let randomId = generateRandomId();

  const diasFiltrados = Dias.filter((dia) => dia.checked);

  db.query(
    "INSERT INTO materias (Nombre, Dia_incio, Dia_Final, ID_Ramdon) VALUES (?, ?, ?, ?)",
    [Materia, FechaI, FechaF, randomId],
    (err, result) => {
      if (err) {
        res.send(false);
        console.log(err);
      } else {
        console.log("Materia insertada correctamente");
        Buscar_Id(randomId, (buscar) => {
          if (buscar !== false && buscar.length > 0) {
            for (let i = 0; i < diasFiltrados.length; i++) {
              if (i !== 7) {
                dias_materia(
                  Hora[diasFiltrados[i].id].id,
                  Hora[diasFiltrados[i].id].HoraI,
                  Hora[diasFiltrados[i].id].HoraF,
                  buscar[0].id
                );
              }
            }
          }
          res.send(true);
        });
      }
    }
  );

  const Buscar_Id = (ID_Ramdon, callback) => {
    db.query(
      "SELECT * FROM Materias WHERE ID_Ramdon = ?",
      [ID_Ramdon],
      (err, result) => {
        if (err) {
          callback(false);
        } else {
          callback(result);
        }
      }
    );
  };

  const dias_materia = (Dia, Hora_inico, Hora_Final, Materia_Asociada) => {
    db.query(
      "INSERT INTO dias_materia (Dia, Hora_inicio, Hora_Final, Materia_Asociada) VALUES (?, ?, ?, ?)",
      [Dia, Hora_inico, Hora_Final, Materia_Asociada],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Día insertado correctamente");
        }
      }
    );
  };
});

routerMaterias.post("/ChoqueMaterias", (req, res) => {
  const body = req.body;
  const Dias = body.Dias;
  const Hora = body.Horas;
  const FechaI = body.FechaI;
  const FechaF = body.FechaF;
  const Id_Materia = body.id;
  const Editar = body.Editar;
  const diasFiltrados = Dias.filter((dia) => dia.checked);
  console.log("datos recibidos Choque");
  //cambiar slq
  let resultados = [];
  //verificar el orden de los datos
  let sql =
    "SELECT * FROM materias AS m JOIN dias_materia AS dm ON m.id = dm.Materia_Asociada WHERE m.Dia_Final >= ? AND m.Dia_incio <= ? AND dm.Hora_inicio >= ? AND dm.Hora_inicio <= ? AND dm.Hora_Final >= ? AND dm.Hora_Final <= ? AND dm.Dia = ?";

  // Variable para almacenar los resultados

  for (let i = 0; i < diasFiltrados.length; i++) {
    if (Editar !== true) {
      var sss = db.query(sql, [
        FechaI,
        FechaF,
        Hora[diasFiltrados[i].id].HoraI,
        Hora[diasFiltrados[i].id].HoraF,
        Hora[diasFiltrados[i].id].HoraI,
        Hora[diasFiltrados[i].id].HoraF,
        diasFiltrados[i].id,
      ]).sql;
      db.query(
        sql,
        [
          FechaI,
          FechaF,
          Hora[diasFiltrados[i].id].HoraI,
          Hora[diasFiltrados[i].id].HoraF,
          Hora[diasFiltrados[i].id].HoraI,
          Hora[diasFiltrados[i].id].HoraF,
          diasFiltrados[i].id,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // Convertir los objetos a cadenas legibles
            const resultadosLegibles = result.map((obj) => JSON.stringify(obj));

            if (resultadosLegibles.length > 0) {
              resultados.push(...resultadosLegibles);
            }
          }
          if (i === diasFiltrados.length - 1) {
            if (resultados.length > 0) {
              // console.log("resultado", resultados);
              console.log("todo Fino");
              let datosObjetos = resultados.map((cadena) => JSON.parse(cadena));
              console.log(datosObjetos.length);
              res.send(datosObjetos);
            } else {
              console.log("No se encontraron coincidencias nuevo");
              let datosObjetos = resultados.map((cadena) => JSON.parse(cadena));
              console.log(datosObjetos.length);
              console.log(sss);
              res.send(false);
            }
          }
        }
      );
    } else {
      let sql =
        "SELECT * FROM materias AS m JOIN dias_materia AS dm ON m.id = dm.Materia_Asociada WHERE m.Dia_Final >= ? AND m.Dia_incio <= ? AND dm.Hora_inicio >= ? AND dm.Hora_inicio <= ? AND dm.Hora_Final >= ? AND dm.Hora_Final <= ? AND dm.Dia = ? AND m.id !=?";
      db.query(
        sql,
        [
          FechaI,
          FechaF,
          Hora[diasFiltrados[i].id].HoraI,
          Hora[diasFiltrados[i].id].HoraF,
          Hora[diasFiltrados[i].id].HoraI,
          Hora[diasFiltrados[i].id].HoraF,
          diasFiltrados[i].id,
          Id_Materia,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // Convertir los objetos a cadenas legibles
            const resultadosLegibles = result.map((obj) => JSON.stringify(obj));

            if (resultadosLegibles.length > 0) {
              resultados.push(...resultadosLegibles);
            }
          }
          if (i === diasFiltrados.length - 1) {
            if (resultados.length > 0) {
              // console.log("resultado", resultados);
              console.log("todo Fino");
              let datosObjetos = resultados.map((cadena) => JSON.parse(cadena));
              res.send(datosObjetos);
            } else {
              console.log("No se encontraron coincidencias nuevo");

              res.send(false);
            }
          }
        }
      );
    }
  }

  // Aquí puedes usar la variable 'resultados' con los datos obtenidos
  // console.log(resultados);
});

routerMaterias.post("/", (req, res) => {
  db.query("SELECT * FROM materias", (err, result) => {
    if (err === true) {
      console.log(err);
    } else {
      res.send(result);
      console.log("Mostrar materias");
    }
  });
});

routerMaterias.post("/Buscar", (req, res) => {
  const Id = req.body.id;
  // const id_Personal = 5;
  console.log("id" + req.body.id);
  db.query(
    "SELECT * FROM materias AS m JOIN dias_materia AS dm ON m.id = dm.Materia_Asociada WHERE m.id=?",
    [Id],
    (err, result) => {
      if (err === true) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

routerMaterias.post("/Actualizar", (req, res) => {
  console.log("actualizar");
  console.log("datos body");

  const body = req.body;
  const Materia = body.Materia;
  const Dias = body.Dias;
  const Hora = body.Horas;
  const FechaI = body.FechaI;
  const FechaF = body.FechaF;
  const id = body.id;
  const diasFiltrados = Dias.filter((dia) => dia.checked);
  const obtener_datos = (Datos, otro) => {
    const valores = Datos.filter((Dato) => {
      return !otro.some((otro) => otro.Dia === Dato.id);
    });
    return valores;
  };
  // const eje = [];
  // console.log("eje");
  // console.log(eje[4]);
  // console.log("eje");

  // db.query(
  //   "SELECT * FROM materias AS m JOIN dias_materia AS dm ON m.id = dm.Materia_Asociada WHERE m.id=?",
  //   [id],
  //   (err, result) => {
  //     if (err === true) {
  //       console.log(err);
  //     } else {
  //       console.log(result);
  //       console.log("dia");
  //       console.log(result[0].Dia);
  //     }
  //   }
  // );
  const sqlMaterias =
    "UPDATE materias SET Nombre=?, Dia_incio=?, Dia_Final=? WHERE materias.id = ?";
  //falta por concluir eliminar dias desactivados y crear los activados
  const sqlHorario =
    "UPDATE dias_materia SET Dia=?, Hora_inicio=?, Hora_Final=? WHERE dias_materia.id = ?";
  db.query(sqlMaterias, [Materia, FechaI, FechaF, id], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      //let eliminarDatos = obtener_datos(Dias, result);
      //let CrearDatos = obtener_datos(diasFiltrados, result);

      ObtenerDias();

      res.send(true);
    }
  });

  const Buscar = (ID, callback) => {
    db.query("SELECT * FROM Materias WHERE id = ?", [ID], (err, result) => {
      if (err) {
        callback(false);
      } else {
        callback(result);
      }
    });
  };

  const dias_materia = (Dia, Hora_inico, Hora_Final, Materia_Asociada, id) => {
    db.query(
      sqlHorario,
      [Dia, Hora_inico, Hora_Final, Materia_Asociada, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(false);
        } else {
          console.log("Día actualizado correctamente");
        }
      }
    );
  };
  const ObtenerDias = () => {
    // const diasnuevos = diasFiltrados.filter((dia) => dia.dia === result.dia);

    const Crear_dias_materia = (
      Dia,
      Hora_inico,
      Hora_Final,
      Materia_Asociada
    ) => {
      console.log("creando dias");
      db.query(
        "INSERT INTO dias_materia (Dia, Hora_inicio, Hora_Final, Materia_Asociada) VALUES (?, ?, ?, ?)",
        [Dia, Hora_inico, Hora_Final, Materia_Asociada],
        (err, result) => {
          if (err) {
            console.log(
              db.query(
                "INSERT INTO dias_materia (Dia, Hora_inicio, Hora_Final, Materia_Asociada) VALUES (?, ?, ?, ?)",
                [Dia, Hora_inico, Hora_Final, Materia_Asociada]
              ).sql
            );
          } else {
            console.log("Día insertado correctamente");
          }
        }
      );
    };

    const estadoDias = [
      { id: 0, Accion: "", resul: "" },
      { id: 1, Accion: "", resul: "" },
      { id: 2, Accion: "", resul: "" },
      { id: 3, Accion: "", resul: "" },
      { id: 4, Accion: "", resul: "" },
      { id: 5, Accion: "", resul: "" },
      { id: 6, Accion: "", resul: "" },
    ];
    db.query(
      "SELECT * FROM materias AS m JOIN dias_materia AS dm ON m.id = dm.Materia_Asociada WHERE m.id=?",
      [id],
      (err, result) => {
        if (err === true) {
          console.log(err);
        } else {
          if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
              for (let e = 0; e < estadoDias.length; e++) {
                if (result[i].Dia === e) {
                  estadoDias[e].Accion = "T";
                  estadoDias[e].resul = result[i].id;
                }
              }
            }

            for (let i = 0; i < Dias.length - 1; i++) {
              if (Dias[i].checked === true) {
                console.log("Actualizando");
                //estadoDias[i].Accion = "A";
                if (estadoDias[i].Accion === "T") {
                  dias_materia(
                    Hora[Dias[i].id].id,
                    Hora[Dias[i].id].HoraI,
                    Hora[Dias[i].id].HoraF,
                    estadoDias[i].resul
                  );
                } else if (estadoDias[i].Accion !== "T") {
                  console.log("Creando:" + i);

                  Crear_dias_materia(
                    Hora[Dias[i].id].id,
                    Hora[Dias[i].id].HoraI,
                    Hora[Dias[i].id].HoraF,
                    id
                  );
                }
              } else if (Dias[i].checked !== true) {
                //estadoDias[i].Accion = "E";
                console.log("eliminando");
                eliminarDia(Dias[i].id, id);
              }
            }

            // for (let i = 0; i < estadoDias.length; i++) {
            //   if (estadoDias[i].Accion === "A") {
            //     console.log("Actualizar" + i);
            //   } else if (estadoDias[i].Accion === "E") {
            //     console.log("eliminar" + i);
            //   } else if (estadoDias[i].Accion === "C") {
            //     console.log("Crear" + i);
            //   }
            // }

            //res.send(true);
          }
        }
      }
    );
  };
  const eliminarDia = (dia, id) => {
    db.query(
      "DELETE FROM dias_materia WHERE Dia =? AND Materia_Asociada = ?;",
      [dia, id],
      (err, result) => {
        if (err === true) {
          console.log(err);
        } else {
          console.log("Dia Eliminado");
        }
      }
    );
  };
});

routerMaterias.post("/Eliminar", (req, res) => {
  const id = req.body.id;
  console.log(req.body);
  console.log("id" + id);
  db.query(
    "DELETE FROM materias WHERE materias.id = ?",
    [id],
    (err, result) => {
      if (err === true) {
        console.log(err);
        res.send(false);
      } else {
        console.log("Materia Eliminada");
        res.send(true);
      }
    }
  );
});

routerMaterias.post("/Calendario", (req, res) => {
  const sql =
    "SELECT * FROM materias AS m JOIN dias_materia AS dm ON m.id = dm.Materia_Asociada ORDER BY m.id ASC";
  db.query(sql, (err, result) => {
    if (err === true) {
      console.log(err);
    } else {
      res.send(result);
      console.log("Mostrar materias calendario");
    }
  });
});

module.exports = routerMaterias;
