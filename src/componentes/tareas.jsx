import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import "./tablas.css";
import React, { useRef, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ReactTable from "react-table";
import DataTable from "react-data-table-component";
import isMatch from "date-fns/isMatch";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { InputG, InputGT2, InputTextarea } from "./inputS.jsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useNavigate } from "react-router-dom";
import img from "./img.png";
import {
  validarHora,
  validarString,
  validarStringInt,
  validarFormularioD,
} from "./ValidarEstados.jsx";
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
    text: texto,
  });
};

export const Tareas = () => {
  const navigate = useNavigate();
  const [textValue, setTextValue] = useState("");

  const handleTextareaChange = (event) => {
    setTextValue(event.target.value);
  };
  const [Editar, setEditar] = useState("");
  const [ListaTareas, setListaTareas] = useState([]);
  const [Tarea_id, setTarea_id] = useState(0);
  const [Tarea, setTarea] = useState({ valor: "", estado: "" });
  const [Fecha, setFecha] = useState({ valor: "", estado: "" });
  const [Hora, setHora] = useState({ valor: "", estado: "" });

  //   {
  //   name: "Fecha y Hora",
  //   cell: (row) => (
  //     <>
  //       <p>
  //         {row.Fecha}
  //         {row.Hora}
  //       </p>
  //     </>
  //   ),
  // },
  const columns = [
    { name: "Tarea", width: "400px", selector: (row) => row.Tarea },
    { name: "Fecha", width: "100px", selector: (row) => row.Fecha },
    { name: "Hora", width: "100px", selector: (row) => row.Hora },

    {
      name: "Acciones",
      width: "120px",
      cell: (row) => (
        <>
          <button
            className="btn btn-success"
            onClick={() => EditarRegistro(row.id)}
          >
            <FaEdit className="textoBN" />
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
    setTarea_id(id);
    setEditar(true);
    console.log(id);
    Buscar(id);
  };
  const Buscar = (id) => {
    let url = "http://localhost:3001/Tareas/Buscar";
    Axios.post(url, { id: id })
      .then((res) => {
        if (res.data.length > 0) {
          let fechaj = new Date();
          fechaj = moment(res.data[0].Fecha).format("YYYY-MM-DD");

          setTarea({ valor: res.data[0].Tarea, estado: "" });

          setFecha({ valor: fechaj, estado: "" });
          setHora({ valor: res.data[0].Hora, estado: "" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Eliminar = (id) => {
    let url = "http://localhost:3001/Tareas/Eliminar";
    Axios.post(url, { id: id })
      .then((res) => {
        mensaje("Listo", "s", "Se ha eliminado una tarea");
        Mostrar();
      })
      .catch((error) => {
        mensaje("Error", "e", "Error al eliminar la tarea");
        console.log(error);
      });
  };
  const agregar = () => {
    let url = "http://localhost:3001/Tareas/Crear";
    if (Editar === true) {
      url = "http://localhost:3001/Tareas/Actualizar";
    }
    Axios.post(url, {
      Tarea: Tarea.valor,
      Fecha: Fecha.valor,
      Hora: Hora.valor,
      id: Tarea_id,
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
  const ValidarDatos = () => {
    let valid = true;

    if (validarStringInt(Tarea.valor)) {
      setTarea((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setTarea((prevNombre) => ({
        ...prevNombre,
        estado: "is-invalid",
      }));
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
      valid = false;
    }

    if (validarHora(Hora.valor)) {
      setHora((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setHora((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
      valid = false;
    }

    return valid;
  };
  const EnviarDatos = () => {
    let v = ValidarDatos();
    if (v === true) {
      agregar();
    } else {
      mensaje("Atención", "w", "Complete los campos del formulario");
      console.log("error");
    }
  };

  const Limpiar = () => {
    setEditar("");
    setTarea_id("");
    setTarea({ valor: "", estado: "" });
    setHora({ valor: "", estado: "" });
    setFecha({ valor: "", estado: "" });
  };
  const Mostrar = () => {
    let url = "http://localhost:3001/Tareas/";
    Axios.post(url)
      .then((res) => {
        // Asigna directamente res.data a ar
        let ar = res.data;

        // Ahora puedes asignar propiedades a los elementos de ar
        for (let i = 0; i < ar.length; i++) {
          let fechaj = new Date();
          fechaj = moment(res.data[i].Fecha).format("DD/MM/YYYY");

          ar[i].id = res.data[i].id;

          ar[i].Fecha = fechaj;
          ar[i].Hora = res.data[i].Hora;
          ar[i].Estado = res.data[i].Estado;
        }

        setListaTareas(ar);
      })
      .catch((error) => {
        console.log(error);
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
            Gestión de Tareas
          </div>
          <div className="card-body">
            <div className="formulario">
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
              <InputTextarea
                Texto={"Tarea"}
                valor={Tarea.valor}
                estado={Tarea.estado}
                FDatos={setTarea}
                FValidar={validarStringInt}
              />

              <InputGT2
                Titulo={""}
                Texto={"#Fecha"}
                Texto2={"Hora"}
                Tipo={"date"}
                Tipo2={"time"}
                valor1={Fecha.valor}
                valor2={Hora.valor}
                estado1={Fecha.estado}
                estado2={Hora.estado}
                FDatos={setFecha}
                FDatos2={setHora}
                FValidar={validarFormularioD}
                FValidar2={validarHora}
              />
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
              {}
            </div>
          </div>

          <br />

          <div className="lista">
            <div>
              <div className="bd-example table table-striped table-hover text-center border-black">
                <DataTable
                  data={ListaTareas}
                  columns={columns}
                  fixedHeader
                  noDataComponent="¡No hay registros para mostrar!"
                  paginationComponentOptions={{
                    rowsPerPageText: "Filas por página:",
                  }}
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
