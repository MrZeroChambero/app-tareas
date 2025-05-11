import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import "./tablas.css";
import React, { useRef, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ReactTable from "react-table";
import DataTable from "react-data-table-component";

import { FaEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";

import {
  InputG,
  InputGT2,
  InputGT2H,
  InputGT2F,
  InputTexMateria,
} from "./inputS.jsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  validarHora,
  validarString,
  validarStringInt,
  validarFormularioD,
} from "./ValidarEstados.jsx";
import { useNavigate } from "react-router-dom";
import img from "./img.png";
const moment = require("moment");

const Alertas = withReactContent(Swal);
const mensaje = (titulo, i, texto) => {
  //error
  //success
  //info
  //question
  //warning
  let icono = "";
  switch (i) {
    case "q":
      icono = "question";
      break;
    case "i":
      icono = "info";
      break;
    case "s":
      icono = "success";
      break;
    case "e":
      icono = "error";
      break;
    case "w":
      icono = "warning";
      break;
    default:
      icono = "";
      break;
  }
  return Alertas.fire({
    icon: icono,
    title: titulo,
    html: texto,
  });
};
const mensajeAw = (titulo, i, texto) => {
  //error
  //success
  //info
  //question
  //warning
  let icono = "";
  switch (i) {
    case "q":
      icono = "question";
      break;
    case "i":
      icono = "info";
      break;
    case "s":
      icono = "success";
      break;
    case "e":
      icono = "error";
      break;
    case "w":
      icono = "warning";
      break;
    default:
      icono = "";
      break;
  }
  return Alertas.fire({
    icon: icono,
    title: titulo,
    html: texto,
  });
};

export const Materias = () => {
  const navigate = useNavigate();
  const [textValue, setTextValue] = useState("");

  const handleTexMateriaChange = (event) => {
    setTextValue(event.target.value);
  };
  const [Editar, setEditar] = useState("");
  const [ListaMaterias, setListaMaterias] = useState([]);
  const [Materia_id, setMateria_id] = useState(0);
  const [Materia, setMateria] = useState({ valor: "", estado: "" });
  const [Fecha, setFecha] = useState({ valor: "", estado: "" });
  const [FechaF, setFechaF] = useState({ valor: "", estado: "" });

  const [Hora, setHora] = useState({ valor: "", estado: "" });

  const [diasSeleccionados, setDiasSeleccionados] = useState([
    { id: 0, dia: "Domingo", checked: false },
    { id: 1, dia: "Lunes", checked: false },
    { id: 2, dia: "Martes", checked: false },
    { id: 3, dia: "Miercoles", checked: false },
    { id: 4, dia: "Jueves", checked: false },
    { id: 5, dia: "Viernes", checked: false },
    { id: 6, dia: "Sabado", checked: false },
    { id: 7, dia: "Todos", checked: false },
  ]);
  const [horasDias, sethorasDias] = useState([
    { id: 0, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
    { id: 1, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
    { id: 2, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
    { id: 3, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
    { id: 4, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
    { id: 5, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
    { id: 6, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
  ]);

  const columns = [
    {
      name: "Materia",
      cell: (row) => (
        <>
          <p>{row.Nombre}</p>
        </>
      ),
    },
    { name: "Incío", width: "120px", selector: (row) => row.FechaI },
    { name: "Finaliza", width: "120px", selector: (row) => row.FechaF },

    {
      name: "Acciones",
      width: "150px",
      cell: (row) => (
        <>
          <button
            className="btn btn-success"
            onClick={() => EditarRegistro(row.id)}
          >
            <FaEdit className="textoBN" />
          </button>
          <button
            className="btn btn-primary"
            onClick={() => mostrarDatos(row.id)}
          >
            <FaEye className="textoBN" />
          </button>
          <button className="btn btn-danger" onClick={() => Eliminar(row.id)}>
            <FaRegTrashAlt className="textoBN" />
          </button>
        </>
      ),
    },
  ];

  const cccc = [{ name: "No se encontraron Registros" }];

  const EditarRegistro = (id) => {
    Limpiar();
    setMateria_id(id);
    setEditar(true);
    console.log(id);
    Buscar(id);
  };
  const Buscar = (id) => {
    let url = "http://localhost:3001/Materias/Buscar";
    Axios.post(url, { id: id })
      .then((res) => {
        if (res.data.length > 0) {
          console.log(res.data[0]);
          let fechaj = new Date();
          fechaj = moment(res.data[0].Dia_incio).format("YYYY-MM-DD");
          setMateria({ valor: res.data[0].Nombre, estado: "" });
          setFecha({ valor: fechaj, estado: "" });
          fechaj = moment(res.data[0].Dia_Final).format("YYYY-MM-DD");
          setFechaF({ valor: fechaj, estado: "" });
          for (let i = 0; i < res.data.length; i++) {
            setDiasSeleccionados((prevDias) => {
              return prevDias.map((dias) =>
                dias.id === res.data[i].Dia
                  ? {
                      ...dias,
                      checked: true,
                    }
                  : dias
              );
            });
            sethorasDias((prevDias) => {
              return prevDias.map((horas) =>
                horas.id === res.data[i].Dia
                  ? {
                      ...horas,
                      estadoI: "",
                      estadoF: "",
                      HoraI: res.data[i].Hora_Inicio,
                      HoraF: res.data[i].Hora_Final,
                    }
                  : horas
              );
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const mostrarDatos = async (id) => {
    try {
      let url = "http://localhost:3001/Materias/Buscar";

      const response = await Axios.post(url, { id: id });

      let arreglo = response.data;
      const datosTabla = [
        { name: "Dia", selector: (row) => row.Ndia },
        { name: "Inicio", selector: (row) => row.Hora_Inicio },
        { name: "Finaliza", selector: (row) => row.Hora_Final },
      ];
      for (let m = 0; m < arreglo.length; m++) {
        if (arreglo[m].Dia === 0) {
          arreglo[m].Ndia = "Domingo";
        } else if (arreglo[m].Dia === 1) {
          arreglo[m].Ndia = "Lunes";
        } else if (arreglo[m].Dia === 2) {
          arreglo[m].Ndia = "Martes";
        } else if (arreglo[m].Dia === 3) {
          arreglo[m].Ndia = "Miércoles";
        } else if (arreglo[m].Dia === 4) {
          arreglo[m].Ndia = "Jueves";
        } else if (arreglo[m].Dia === 5) {
          arreglo[m].Ndia = "Viernes";
        } else if (arreglo[m].Dia === 6) {
          arreglo[m].Ndia = "Sabado";
        }
      }
      console.log(arreglo);
      await Alertas.fire({
        icon: "info",
        title: response.data[0].Nombre,
        html: (
          <DataTable
            data={arreglo}
            columns={datosTabla}
            noDataComponent="¡No hay registros para mostrar!"
            paginationComponentOptions={{
              rowsPerPageText: "Filas por página:",
            }}
          />
        ),
        customClass: "swal-height",
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  // const mostrarDatos = (id) => {
  //   let url = "http://localhost:3001/Materias/Buscar";
  //   Axios.post(url, { id: id })
  //     .then((res) => {
  //       if (res.data.length > 0) {
  //         console.log(res.data[0]);
  //         let fechaj = new Date();
  //         fechaj = moment(res.data[0].Dia_incio).format("YYYY-MM-DD");
  //         setMateria({ valor: res.data[0].Nombre, estado: "" });
  //         setFecha({ valor: fechaj, estado: "" });
  //         fechaj = moment(res.data[0].Dia_Final).format("YYYY-MM-DD");
  //         setFechaF({ valor: fechaj, estado: "" });
  //         for (let i = 0; i < res.data.length; i++) {
  //           setDiasSeleccionados((prevDias) => {
  //             return prevDias.map((dias) =>
  //               dias.id === res.data[i].Dia
  //                 ? {
  //                     ...dias,
  //                     checked: true,
  //                   }
  //                 : dias
  //             );
  //           });
  //           sethorasDias((prevDias) => {
  //             return prevDias.map((horas) =>
  //               horas.id === res.data[i].Dia
  //                 ? {
  //                     ...horas,
  //                     estadoI: "",
  //                     estadoF: "",
  //                     HoraI: res.data[i].Hora_Inicio,
  //                     HoraF: res.data[i].Hora_Final,
  //                   }
  //                 : horas
  //             );
  //           });
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const Eliminar = (id) => {
    let url = "http://localhost:3001/Materias/Eliminar";
    Axios.post(url, { id: id })
      .then((res) => {
        console.log(res);
        if (res.data === true) {
          Mostrar();

          mensaje("Listo", "s", "Se ha eliminado una Materia");
        } else {
          mensaje("Error", "e", "Error al Eliminar");
        }
        Mostrar();
      })
      .catch((error) => {
        mensaje("Error", "e", "Error al eliminar la Materia");
        console.log(error);
      });
  };
  const validarChoqueMaterias = async (diasFiltrados) => {
    try {
      let url = "http://localhost:3001/Materias/ChoqueMaterias";
      const response = await Axios.post(url, {
        FechaI: Fecha.valor,
        FechaF: FechaF.valor,
        Dias: diasFiltrados,
        Horas: horasDias,
        Editar: Editar,
        id: Materia_id,
      });
      //console.log("resultado:" + response);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const agregar = () => {
    let url = "http://localhost:3001/Materias/Crear";
    if (Editar === true) {
      url = "http://localhost:3001/Materias/Actualizar";
    }

    Axios.post(url, {
      Materia: Materia.valor,
      FechaI: Fecha.valor,
      FechaF: FechaF.valor,
      Dias: diasSeleccionados,
      Horas: horasDias,
      id: Materia_id,
    })
      .then((res) => {
        //luego de enviar los datos
        Mostrar();
        if (res.data === true && Editar === true) {
          Limpiar();
          mensaje(
            "Actualización exitosa",
            "s",
            "Los datos se actualizaron correctamente"
          );
          Mostrar();
        } else if (res.data === false && Editar === true) {
          mensaje("Error", "e", "Error al Actualizar");
        }
        if (res.data === true && Editar !== true) {
          Limpiar();
          mensaje("Resgistro completo", "s", "Se registraron los datos");
        } else if (res.data === false && Editar !== true) {
          mensaje("Error", "e", "Error al registrar");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ValidarDatos = async () => {
    try {
      let valid = true;
      let texto =
        "<p style='text-align: justify; font-size: 0.7em;'>Debe Verificar los siguentes Campos:";

      if (validarStringInt(Materia.valor)) {
        setMateria((prev) => ({
          ...prev,
          estado: "is-valid",
        }));
      } else {
        setMateria((prev) => ({
          ...prev,
          estado: "is-invalid",
        }));
        texto += "<br> Materia: solo se aceptan letras, numeros y espacios";
        valid = false;
      }
      if (validarFormularioD(Fecha.valor)) {
        setFecha((prev) => ({
          ...prev,
          estado: "is-valid",
        }));
      } else {
        setFecha((prev) => ({
          ...prev,
          estado: "is-invalid",
        }));
        texto += "<br> Fecha inicial: debe selecionar una fecha valida";
        valid = false;
      }
      if (validarFormularioD(FechaF.valor)) {
        setFechaF((prev) => ({
          ...prev,
          estado: "is-valid",
        }));
      } else {
        setFechaF((prev) => ({
          ...prev,
          estado: "is-invalid",
        }));
        texto += "<br> Fecha Final: debe selecionar una fecha valida";

        valid = false;
      }

      if (FechaF.valor < Fecha.valor) {
        setFechaF((prev) => ({
          ...prev,
          estado: "is-invalid",
        }));
        setFecha((prev) => ({
          ...prev,
          estado: "is-invalid",
        }));
        texto += "<br> Fecha Final debe ser mayor a la Fecha inicial";
        valid = false;
      }
      //validar Horas
      const diasFiltrados = diasSeleccionados.filter(
        (dia) => dia.checked === true && dia.id !== 7
      );
      for (let i = 0; i < diasFiltrados.length; i++) {
        // console.log(horasDias);
        if (i !== 7) {
          console.log("horas");
          console.log(
            horasDias[diasFiltrados[i].id].HoraI <
              horasDias[diasFiltrados[i].id].HoraF
          );

          if (
            validarHora(horasDias[diasFiltrados[i].id].HoraI) &&
            horasDias[diasFiltrados[i].id].HoraI <
              horasDias[diasFiltrados[i].id].HoraF &&
            validarHora(horasDias[diasFiltrados[i].id].HoraF)
          ) {
            console.log();
            sethorasDias((prevDias) => {
              return prevDias.map((horas) =>
                horas.id === diasFiltrados[i].id
                  ? {
                      ...horas,
                      estadoI: "is-valid",
                      estadoF: "is-valid",
                    }
                  : horas
              );
            });
          } else {
            console.log(diasFiltrados[i].id);
            sethorasDias((prevDias) => {
              return prevDias.map((horas) =>
                horas.id === diasFiltrados[i].id
                  ? {
                      ...horas,
                      estadoI: "is-invalid",
                      estadoF: "is-invalid",
                    }
                  : horas
              );
            });
            texto +=
              "<br> Hora incial del dia: " +
              diasFiltrados[i].dia +
              " debe ser una hora valida";

            valid = false;
          }
          // console.log(validarHora(horasDias[diasFiltrados[i].id].HoraF));
          // if (validarHora(horasDias[diasFiltrados[i].id].HoraF)) {
          //   sethorasDias((prevDias) => {
          //     return prevDias.map((horas) =>
          //       horas.id === diasFiltrados[i].id
          //         ? {
          //             ...horas,
          //             estadoF: "is-valid",
          //           }
          //         : horas
          //     );
          //   });
          // } else {
          //   sethorasDias((prevDias) => {
          //     return prevDias.map((horas) =>
          //       horas.id === diasFiltrados[i].id
          //         ? { ...horas, estadoF: "is-invalid" }
          //         : horas
          //     );
          //   });

          //   texto +=
          //     "<br> Hora Final del dia: " +
          //     diasFiltrados[i].dia +
          //     " debe ser una hora valida";

          //   valid = false;
          // }
          if (
            horasDias[diasFiltrados[i].id].HoraI >
            horasDias[diasFiltrados[i].id].HoraF
          ) {
            setHora((prev) => ({
              ...prev,
              estadoI: "is-invalid",
              estadoF: "is-invalid",
            }));
            texto +=
              "<br> Hora incial del dia: " +
              diasFiltrados[i].dia +
              " debe ser mayor que la Hora Final";
            valid = false;
          }
        }
      }
      console.log("antes");
      if (diasFiltrados.length > 0) {
        let choqueMaterias = await validarChoqueMaterias(diasFiltrados);

        if (choqueMaterias !== false && choqueMaterias.length > 0) {
          console.log(choqueMaterias);

          valid = false;
          //console.log("adentro");
          texto +=
            "<br> La Horas Seleccionadas Chocan con las siguientes Materias:";
          for (let i = 0; i < choqueMaterias.length; i++) {
            console.log("i:" + i + " arrrai:" + choqueMaterias.length);
            let Ihora = choqueMaterias[i].Hora_Inicio.split(":");
            let Fhora = choqueMaterias[i].Hora_Final.split(":");
            texto +=
              "<br> La materia:" +
              choqueMaterias[i].Nombre +
              " el dia:" +
              diasSeleccionados[choqueMaterias[i].Dia].dia +
              " que comienza a las: " +
              Ihora[0] +
              ":" +
              Ihora[1] +
              " y Concluye a las: " +
              Fhora[0] +
              ":" +
              Fhora[1];
          }
        }
        // } else if (choqueMaterias === false) {
        //   valid = false;
        //   console.log("error el verificar choque de materias");
        // }
      } else {
        texto += "<br> Debe seleccionar Minimo un dia";
      }
      if (valid !== true) {
        //validar que las materias no choquen
        console.log("mensaje");
        texto += "</p>";
        await Alertas.fire({
          icon: "info",
          title: "Verifique los datos",
          html: texto,
          customClass: "swal-height",
        });
        //console.log(choqueMaterias);
        // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      }
      return valid;
    } catch (error) {
      console.log("Error al validar choque de materias:", error);
      return false;
    }
  };
  const EnviarDatos = async () => {
    //agregar();
    //console.log(ValidarDatos());
    let v = await ValidarDatos();
    if (v === true) {
      agregar();
    } else {
      console.log("validar:" + v);
    }
  };
  const VerHorario = (id) => {};

  const Limpiar = () => {
    setEditar("");
    setMateria_id("");
    setMateria({ valor: "", estado: "" });
    setHora({ valor: "", estado: "" });
    setFecha({ valor: "", estado: "" });

    setDiasSeleccionados([
      { id: 0, dia: "Domingo", checked: false },
      { id: 1, dia: "Lunes", checked: false },
      { id: 2, dia: "Martes", checked: false },
      { id: 3, dia: "Miercoles", checked: false },
      { id: 4, dia: "Jueves", checked: false },
      { id: 5, dia: "Viernes", checked: false },
      { id: 6, dia: "Sabado", checked: false },
      { id: 7, dia: "Todos", checked: false },
    ]);
    sethorasDias([
      { id: 0, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
      { id: 1, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
      { id: 2, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
      { id: 3, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
      { id: 4, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
      { id: 5, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
      { id: 6, HoraI: "", HoraF: "", estadoI: "", estadoF: "" },
    ]);
  };
  const Mostrar = () => {
    let url = "http://localhost:3001/Materias/";

    Axios.post(url)
      .then((res) => {
        // Asigna directamente res.data a ar
        let ar = res.data;
        console.log(res.data);
        // Ahora puedes asignar propiedades a los elementos de ar
        let e = 0;
        for (let i = 0; i < ar.length; i++) {
          let fechaj = new Date();
          fechaj = moment(res.data[i].Dia_incio).format("DD/MM/YYYY");
          ar[i].id = res.data[i].id;
          ar[i].FechaI = fechaj;
          fechaj = new Date();
          fechaj = moment(res.data[i].Dia_Final).format("DD/MM/YYYY");
          ar[i].FechaF = fechaj;
          ar[i].Nombre = res.data[i].Nombre;
          e = i;
        }
        console.log(e);

        setListaMaterias(ar);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };
  const dias = () => {
    console.log(diasSeleccionados);
  };

  const handleCheckboxChange = (id, isChecked) => {
    setDiasSeleccionados((prevDias) => {
      const updatedDias = prevDias.map((dia) =>
        dia.id === id ? { ...dia, checked: isChecked } : dia
      );

      // Verifica si todos los días (excepto el actual y el día "todos") están seleccionados
      const allOtherDaysSelected = updatedDias
        .filter((dia) => dia.id !== id && dia.id !== 7)
        .every((dia) => dia.checked);
      // Si el día actual es el "todos" (ID 7) y está seleccionado, establece todos los días en true
      if (id === 7 && isChecked) {
        return updatedDias.map((dia) => ({ ...dia, checked: true }));
      }
      // Si todos los demás días están seleccionados, establece el día actual y el día "todos" en true
      if (allOtherDaysSelected === true && isChecked === true) {
        return updatedDias.map((dia) =>
          dia.id === id || dia.id === 7 ? { ...dia, checked: true } : dia
        );
      } else if (!isChecked && id !== 7) {
        // Si el día actual se establece en false, también establece el día 7 en false
        return updatedDias.map((dia) =>
          dia.id === 7 ? { ...dia, checked: false } : dia
        );
      } else if (isChecked === false) {
      }
      return updatedDias;
    });
  };

  useEffect(() => {
    // Realiza la consulta solo una vez después de cargar la página
    Mostrar();
  }, []);
  const estilos = {
    width: "50px", // Establece el ancho deseado
    height: "50px", // Establece el alto deseado
    objectFit: "cover", // Asegura que la imagen cubra el espacio sin deformarse
  };

  return (
    <div className="container">
      <div className="App">
        {/* formulario */}
        <div className="card text-center">
          <div className="card-header">
            {" "}
            <img src={img} style={estilos} alt="Imagen personalizada" />
            Gestión de Materias
          </div>
          <div className="card-body">
            <div className="formulario inputF ">
              <div className="p">
                <button
                  className="btn btn-outline-info"
                  onClick={() => {
                    navigate("/Tareas");
                  }}
                >
                  Tareas
                </button>
                <button
                  className="btn btn-outline-info"
                  onClick={() => {
                    navigate("/Materias");
                  }}
                >
                  Materias
                </button>
                <button
                  className="btn btn-outline-info"
                  onClick={() => {
                    navigate("/Calendario");
                  }}
                >
                  Calendario
                </button>
              </div>
              <InputG
                Texto={"Materia"}
                valor={Materia.valor}
                estado={Materia.estado}
                FDatos={setMateria}
                FValidar={validarStringInt}
              />

              <InputGT2F
                Titulo={""}
                Texto={"Fecha incio"}
                Texto2={"Fecha final"}
                Tipo={"date"}
                Tipo2={"date"}
                valor1={Fecha.valor}
                valor2={FechaF.valor}
                estado1={Fecha.estado}
                estado2={FechaF.estado}
                FDatos={setFecha}
                FDatos2={setFechaF}
                FValidar={validarFormularioD}
                FValidar2={validarFormularioD}
              />
              <div className="input-group align-items-center justify-content-center">
                <div className="input-group align-items-center justify-content-center">
                  <span className="form-control fondo-gris" id="basic-addon1">
                    Selecciona los días de la semana:
                  </span>
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  {diasSeleccionados.map((dia) => (
                    <React.Fragment key={dia.id}>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id={dia.id}
                        checked={dia.checked}
                        onChange={(e) =>
                          handleCheckboxChange(dia.id, e.target.checked)
                        }
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor={dia.id}
                      >
                        {dia.dia}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
                {diasSeleccionados.map((dia) => (
                  <React.Fragment key={dia.id}>
                    {dia.checked && dia.id !== 7 ? (
                      <>
                        <InputGT2H
                          Titulo={dia.dia}
                          Texto={"Hora incio"}
                          Texto2={"Hora final"}
                          Tipo={"time"}
                          Tipo2={"time"}
                          id={dia.id}
                          obj={horasDias}
                          valor1={horasDias[dia.id].HoraI}
                          valor2={horasDias[dia.id].HoraF}
                          estado1={horasDias[dia.id].estadoI}
                          estado2={horasDias[dia.id].estadoF}
                          FDatos={sethorasDias}
                          FDatos2={sethorasDias}
                          FValidar={validarHora}
                          FValidar2={validarHora}
                        />
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="card-footer text-body-secondary custom-card-footer">
              {Editar !== true ? (
                <button className="btn btn-success" onClick={EnviarDatos}>
                  Crear
                </button>
              ) : (
                <>
                  <button className="btn btn-success" onClick={EnviarDatos}>
                    Actualizar
                  </button>
                  <button className="btn btn-danger" onClick={Limpiar}>
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>

          <br />

          <div className="lista">
            <div>
              <div className="bd-example table table-striped table-hover text-center border-black">
                <DataTable
                  data={ListaMaterias}
                  columns={columns}
                  noDataComponent="¡No hay registros para mostrar!"
                  paginationComponentOptions={{
                    rowsPerPageText: "Filas por página:",
                  }}
                  fixedHeader
                  pagination
                  paginationPerPage={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
