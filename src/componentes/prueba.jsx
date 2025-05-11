// const validarChoqueMaterias = async () => {
//   try {
//     let url = "http://localhost:3001/Materias/ChoqueMaterias";
//     const response = await Axios.post(url, {
//       FechaI: Fecha.valor,
//       FechaF: FechaF.valor,
//       Dias: diasSeleccionados,
//       Horas: horasDias,
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };
// const mensaje = (titulo, i, texto) => {
//   //error
//   //success
//   //info
//   //question
//   //warning
//   let icono = "";
//   switch (i) {
//     case "q":
//       icono = "question";
//       break;
//     case "i":
//       icono = "info";
//       break;
//     case "s":
//       icono = "success";
//       break;
//     case "e":
//       icono = "error";
//       break;
//     case "w":
//       icono = "warning";
//       break;
//     default:
//       icono = "";
//       break;
//   }
//   return Alertas.fire({
//     icon: icono,
//     title: titulo,
//     html: texto,
//   });
// };

// const ValidarDatos = async () => {
//   try {
//     let valid = true;
//     let texto =
//       "<p style='text-align: justify; font-size: 1em;'>Debe Verificar los siguentes Campos:";
//     let choqueMaterias = await validarChoqueMaterias();

//     if (choqueMaterias !== false && choqueMaterias.length > 0) {
//       texto +=
//         "<br> La Horas Seleccionadas Chocan con las siguientes Materias:";
//       for (let i = 0; i < choqueMaterias.length; i++) {
//         texto +=
//           "<br> La materia:" +
//           choqueMaterias[i].Nombre +
//           " el dia:" +
//           diasSeleccionados[choqueMaterias[i].Dia].dia +
//           " que comienza a las: " +
//           choqueMaterias[i].Hora_Inicio +
//           " y Concluye a las: " +
//           choqueMaterias[i].Hora_Final;
//       }
//     }
//     if (valid !== true) {
//       //validar que las materias no choquen
//       texto += "</p>";
//       mensaje("Verifique los datos", "i", texto);
//     }
//     return valid;
//   } catch (error) {
//     console.log("Error al validar choque de materias:", error);
//     return false;
//   }
// };

// const mensaje = async (titulo, i, texto) => {
//   // ... (código existente)

//   let choqueMaterias = await validarChoqueMaterias();

//   if (choqueMaterias !== false && choqueMaterias.length > 0) {
//     texto += "<br> Las Horas Seleccionadas Chocan con las siguientes Materias:";
//     for (let i = 0; i < choqueMaterias.length; i++) {
//       texto +=
//         "<br> La materia:" +
//         choqueMaterias[i].Nombre +
//         " el dia:" +
//         diasSeleccionados[choqueMaterias[i].Dia].dia +
//         " que comienza a las: " +
//         choqueMaterias[i].Hora_Inicio +
//         " y Concluye a las: " +
//         choqueMaterias[i].Hora_Final;
//     }
//   }

//   if (valid !== true) {
//     // Validar que las materias no choquen
//     texto += "</p>";
//     await Alertas.fire({
//       icon: icono,
//       title: titulo,
//       html: texto,
//     });
//   }

//   return valid;
// };

// routerMaterias.post("/ChoqueMaterias", (req, res) => {
//   const body = req.body;
//   const Dias = body.Dias;
//   const Hora = body.Horas;
//   const FechaI = body.FechaI;
//   const FechaF = body.FechaF;
//   const Id_Materia = body.id;
//   const Editar = body.Editar;
//   const diasFiltrados = Dias.filter((dia) => dia.checked);
//   let sql =
//     "SELECT * FROM materias AS m JOIN dias_materia AS dm ON m.id = dm.Materia_Asociada WHERE m.Dia_incio >= ? AND m.Dia_Final <= ? AND dm.Hora_inicio >= ? AND dm.Hora_Final <= ?";

//   // Variable para almacenar los resultados
//   let resultados = [];

//   for (let i = 0; i < diasFiltrados.length; i++) {
//     if (i !== 7) {

//         db.query(
//           sql,
//           [
//             FechaI,
//             FechaF,
//             Hora[diasFiltrados[i].id].HoraI,
//             Hora[diasFiltrados[i].id].HoraF,
//           ],
//           (err, result) => {
//             if (err) {
//               console.log(err);
//             } else {
//               // Agregar los resultados al arreglo

//               if (result.length > 0) {
//                 resultados.push(result);
//                 console.log(result);
//               }
//             }
//           }
//         );

//     }
//   }
//   if (resultados.length > 0) {
//     console.log("resultado");
//     res.send(resultados);
//   } else {
//     console.log("error");

//     res.send(false);
//   }

// });

// routerMaterias.post("/ChoqueMaterias", (req, res) => {
//   const body = req.body;
//   const Dias = body.Dias;
//   const Hora = body.Horas;
//   const FechaI = body.FechaI;
//   const FechaF = body.FechaF;
//   const Id_Materia = body.id;
//   const Editar = body.Editar;
//   const diasFiltrados = Dias.filter((dia) => dia.checked);
//   let sql =
//     "SELECT * FROM materias AS m JOIN dias_materia AS dm ON m.id = dm.Materia_Asociada WHERE m.Dia_incio >= ? AND m.Dia_Final <= ? AND dm.Hora_inicio >= ? AND dm.Hora_Final <= ?";

//   // Variable para almacenar los resultados
//   let resultados = [];

//   for (let i = 0; i < diasFiltrados.length; i++) {
//     if (i !== 7) {
//       db.query(
//         sql,
//         [
//           FechaI,
//           FechaF,
//           Hora[diasFiltrados[i].id].HoraI,
//           Hora[diasFiltrados[i].id].HoraF,
//         ],
//         (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             // Agregar los resultados al arreglo

//             if (result.length > 0) {
//               resultados.push(result);
//               // console.log(result);
//             }
//           }
//           if (i === diasFiltrados.length - 1) {
//             if (resultados.length > 0) {
//               console.log("resultado" + resultados);
//               res.send(resultados);
//             } else {
//               console.log("error");
//               res.send(false);
//             }
//           }
//         }
//       );
//     }

//   }

// });

///////

//   //no funciona porque esta verificando el nombre del dia con true o false
//   // tiene que agregar el nombre del dia como variable
//   // const verificarTodosExcepto = (diaActual, checked) => {
//   //   console.log(diaActual);
//   //   for (const dia in diasSeleccionados) {
//   //     if (diaActual !== 7) {
//   //       if (dia !== diaActual && !diasSeleccionados[dia]) {
//   //         return false; // Al menos un día no está seleccionado
//   //       }
//   //     }
//   //   }
//   // const verificarTodosExcepto = (diaActual, checked) => {
//   //   for (let i = 0; i < diasSeleccionados.length; i++) {
//   //     if (diaActual !== 7 && checked === true) {
//   //       if (diasSeleccionados.checked[i] === false) {
//   //         return false;
//   //       }
//   //     } else if (i === diasSeleccionados.length) {
//   //       return true;
//   //     }
//   //   }
//   // };
//   // console.log(id + checked);
//   // if (id === 7) {
//   //   setDiasSeleccionados([
//   //     { id: 0, dia: "domingo", checked: true },
//   //     { id: 1, dia: "lunes", checked: true },
//   //     { id: 2, dia: "martes", checked: true },
//   //     { id: 3, dia: "miercoles", checked: true },
//   //     { id: 4, dia: "jueves", checked: true },
//   //     { id: 5, dia: "viernes", checked: true },
//   //     { id: 6, dia: "sabado", checked: true },
//   //     { id: 7, dia: "todos", checked: true },
//   //   ]);
//   // } else {
//   //   setDiasSeleccionados((prevDias) => ({
//   //     ...prevDias,
//   //     [id]: checked,
//   //   }));
//   // }
//   const handleSelectAll = () => {
//     setDiasSeleccionados((prevDias) =>
//       prevDias.map((dia) => ({ ...dia, checked: true }))
//     );
//   };
//   if (id === 7) {
//     handleSelectAll();
//   }
//   setDiasSeleccionados((prevDias) =>
//     prevDias.map((dia) =>
//       dia.id === id ? { ...dia, checked: checked } : dia
//     )
//   );

//   // if (event.target.id === "todos" && checked === true) {
//   //   setDiasSeleccionados({
//   //     lunes: true,
//   //     martes: true,
//   //     miercoles: true,
//   //     jueves: true,
//   //     viernes: true,
//   //     sabado: true,
//   //     domingo: true,
//   //     todos: true,
//   //   });
//   // } else if (event.target.id !== "todos" && checked !== true) {

//   //   setDiasSeleccionados((prevDias) => ({
//   //     ...prevDias,
//   //     todos: false,
//   //   }));
//   // } else {
//   //   setDiasSeleccionados((prevDias) => ({
//   //     ...prevDias,
//   //     [id]: checked,
//   //   }));
//   // }
// };
// const [diasSeleccionados, setDiasSeleccionados] = useState([
//   { id: 0, dia: "Domingo", checked: false },
//   { id: 1, dia: "Lunes", checked: false },
//   { id: 2, dia: "Martes", checked: false },
//   { id: 3, dia: "Miercoles", checked: false },
//   { id: 4, dia: "Jueves", checked: true },
//   { id: 5, dia: "Viernes", checked: true },
//   { id: 6, dia: "Sabado", checked: false },
// ]);
// const [dias, setDias] = useState([
//   { id: 0, dia: "Domingo", checked: false },
//   { id: 1, dia: "Lunes", checked: false },

//   { id: 4, dia: "Jueves", checked: true },
//   { id: 5, dia: "Viernes", checked: true },
//   { id: 6, dia: "Sabado", checked: false },
// ]);

///////////////////////////////

// for (let i = 0; i < Dias.length; i++) {
//   if (Dias[i].checked !== true) {
//     //eliminar
//     console.log("eliminar:" + i);
//   } else if (Dias[i].checked === true) {
//     if (result[i] === undefined) {
//       //crear
//       console.log("crear");
//     } else if (result[i].Dia === Dias[i].id) {
//       console.log("Actualizar");

//       //actualizar
//       // dias_materia(
//       //   Hora[Dias[i].id].id,
//       //   Hora[Dias[i].id].HoraI,
//       //   Hora[Dias[i].id].HoraF,
//       //   result[i].id
//       // );
//     }
//     console.log(i);
//   }
// }

// // ////////////////////////////////////////////
// export const Calendario = () => {

//   const [actividades, setActividades] = useState([]);
//   const eventos = [
//     {
//       id: 1,
//       title: "Evento 1",
//       start: new Date(2015, 4, 1, 10, 0), // Fecha y hora de inicio
//       end: new Date(2024, 4, 10, 12, 0), // Fecha y hora de finalización
//     },
//     // ...otros eventos
//   ];

//   const ev = (evs) => {
//     console.log("Asda");
//     const eventos = [];
//     // const fechaInicio = new Date(2014, 4, 10); // Fecha de

//     // const fechaFin = new Date(2024, 4, 10); // Fecha de fin
//     // console.log(evs.start + " " + evs.end);
//     const fechaInicio = evs[0].start; // Fecha de inicio
//     const fechaFin = evs[0].end; // Fecha de fin

//     // Itera desde la fecha de inicio hasta la fecha de fin
//     for (
//       let fecha = fechaInicio;
//       fecha <= fechaFin;
//       fecha.setDate(fecha.getDate() + 1)
//     ) {
//       // Excluye los lunes (día de la semana 1) y los sábados (día de la semana 6)
//       if (fecha.getDay() !== 1 && fecha.getDay() !== 6) {
//         eventos.push({
//           id: eventos.length + 1,
//           title: `Evento ${eventos.length + 1}`,
//           start: new Date(fecha),
//           end: new Date(fecha),
//         });
//       }
//     }
//     setActividades(eventos);
//   };

//     return (
//       <div className="container">
//         <div className="App">
//           <div className="card text-center">
//             <div className="card-body">
//               <div className="calendario">
//                 <button
//                   onClick={() => {
//                     ev(eventos);
//                   }}
//                 >
//                   sdad
//                 </button>
//                 <Calendar
//                   culture="es"

//                   // components={{
//                   //   toolbar: CustomToolbar, // Utiliza tu componente personalizado aquí
//                   // }}
//                   events={actividades}
//                   // dayPropGetter={dayPropGetter}

//                   endAccessor="end"
//                 ></Calendar>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     );
// }
