//import "../CSS/Estudiantes.css";

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
import {
  InputG,
  InputG2,
  InputGT,
  MyInput,
  InputKeydown,
  SelectorGenero,
  SelectorEducacion,
  InputCC,
  InputTextarea,
} from "./inputS.jsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  validarInt,
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

export const DatosRepresentantes = () => {
  const [textValue, setTextValue] = useState("");

  const handleTextareaChange = (event) => {
    setTextValue(event.target.value);
  };
  const [Editar, setEditar] = useState("");
  const [Representantes, setRepresentantes] = useState([]);
  const [Representante_id, setRepresentante_id] = useState(0);
  const [Nombre_1, setNombre_1] = useState({ valor: "", estado: "" });
  const [Nombre_2, setNombre_2] = useState({ valor: "", estado: "" });
  const [Apellido_1, setApellido_1] = useState({ valor: "", estado: "" });
  const [Apellido_2, setApellido_2] = useState({ valor: "", estado: "" });
  const [Cedula, setCedula] = useState({ valor: "", estado: "" });
  const [Genero, setGenero] = useState({ valor: "", estado: "" });
  const [Direccion, setDireccion] = useState({ valor: "", estado: "" });
  const [Oficio, setOficio] = useState({ valor: "", estado: "" });
  const [FechaN, setFechaN] = useState({ valor: "", estado: "" });
  const [Nivel_Estudios, setNivel_Estudios] = useState({
    valor: "",
    estado: "",
  });
  const [Conlumnas, setConlumnas] = useState([{}, {}, {}, {}]);
  const [Lista, setLista] = useState([]);
  // const columns = [
  //   { field: "id", headerName: "ID", width: 100 },
  //   { field: "Nombre_1", headerName: "Nombre", width: 150 },
  //   { field: "Apellido_1", headerName: "Apellido", width: 150 },
  //   { field: "Cedula", headerName: "Cedula", width: 150 },

  //   // Agrega más columnas según tus necesidades
  // ];
  const columns = [
    { name: "id", selector: (row) => row.id },
    { name: "Primer Nombre", selector: (row) => row.Nombre_1 },
    { name: "Primer Apellido", selector: (row) => row.Apellido_1 },
    { name: "Cedula", selector: (row) => row.Cedula },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <button
            className="btn btn-success"
            onClick={() => EditarRegistro(row.idRepresntate)}
          >
            <FaEdit className="textoBN" />
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleButtonClick(row.idRepresntate)}
          >
            <FaRegTrashAlt className="textoBN" />
          </button>
        </>
      ),
    },
  ];
  const tabla = () => {
    let columns = [];
    console.log(Representantes.length);
    if (Representantes.length < 0) {
      columns = [
        { name: "id", selector: (row) => row.id },
        { name: "Primer Nombre", selector: (row) => row.Nombre_1 },
        { name: "Primer Apellido", selector: (row) => row.Apellido_1 },
        { name: "Cedula", selector: (row) => row.Cedula },
        {
          name: "Acciones",
          cell: (row) => (
            <>
              <button
                className="btn btn-success"
                onClick={() => EditarRegistro(row.idRepresntate)}
              >
                <FaEdit className="textoBN" />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleButtonClick(row.idRepresntate)}
              >
                <FaRegTrashAlt className="textoBN" />
              </button>
            </>
          ),
        },
      ];
    } else {
      columns = [{ name: "id", selector: (row) => row.id }];
    }
    setConlumnas(columns);
  };
  const cccc = [{ name: "No se encontraron Registros" }];

  const handleButtonClick = (row) => {
    // Lógica para manejar el clic del botón
    console.log("Botón clickeado para:", row);
  };

  const rows = [
    // Aquí debes pasar tus datos del JSON
    // Ejemplo:
    { id: 1, Nombre_1: "sad", Apellido_1: "fgg", Cedula: 222 },
    // ...
  ];
  const EditarRegistro = (id) => {
    Limpiar();
    setRepresentante_id(id);
    setEditar(true);
    console.log(id);
    Buscar(id);
  };
  const Buscar = (id) => {
    let url = "http://localhost:3001/Representantes/Buscar";
    Axios.post(url, { id: id })
      .then((res) => {
        console.log(res.data);
        let fechaj = new Date();
        fechaj = moment(res.data[0].Fecha_Nacimiento).format("YYYY-MM-DD");
        setNombre_1((prevEstado) => ({
          ...prevEstado,
          valor: res.data[0].Nombre_1,
        }));
        setNombre_2((prevEstado) => ({
          ...prevEstado,
          valor: res.data[0].Nombre_2,
        }));
        setApellido_1((prevEstado) => ({
          ...prevEstado,
          valor: res.data[0].Apellido_1,
        }));
        setApellido_2((prevEstado) => ({
          ...prevEstado,
          valor: res.data[0].Apellido_2,
        }));
        setCedula((prevEstado) => ({
          ...prevEstado,
          valor: res.data[0].Cedula,
        }));
        setDireccion((prevEstado) => ({
          ...prevEstado,
          valor: res.data[0].Direccion,
        }));
        setGenero((prevEstado) => ({
          ...prevEstado,
          valor: res.data[0].Genero,
        }));
        setNivel_Estudios((prevEstado) => ({
          ...prevEstado,
          valor: res.data[0].Nivel_Estudios,
        }));
        setOficio((prevEstado) => ({
          ...prevEstado,
          valor: res.data[0].Oficio,
        }));
        setFechaN((prevEstado) => ({
          ...prevEstado,
          valor: fechaj,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const agregar = () => {
    let url = "http://localhost:3001/Representantes/Crear";
    if (Editar === true) {
      url = "http://localhost:3001/Representantes/Actualizar";
    }
    Axios.post(url, {
      Nombre1: Nombre_1.valor,
      Nombre2: Nombre_2.valor,
      Apellido1: Apellido_1.valor,
      Apellido2: Apellido_2.valor,
      Cedula: Cedula.valor,
      Genero: Genero.valor,
      FechaN: FechaN.valor,
      Oficio: Oficio.valor,
      Direccion: Direccion.valor,
      Nivel_Estudios: Nivel_Estudios.valor,
      id: Representante_id,
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
    if (validarString(Nombre_1.valor)) {
      setNombre_1((prevNombre) => ({
        ...prevNombre,
        estado: "is-valid",
      }));
    } else {
      setNombre_1((prevNombre) => ({
        ...prevNombre,
        estado: "is-invalid",
      }));
      valid = false;
    }
    if (validarString(Nombre_2.valor)) {
      setNombre_2((prevNombre) => ({
        ...prevNombre,
        estado: "is-valid",
      }));
    } else {
      setNombre_2((prevNombre) => ({
        ...prevNombre,
        estado: "is-invalid",
      }));
    }
    if (validarString(Apellido_1.valor)) {
      setApellido_1((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setApellido_1((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
      valid = false;
    }
    if (validarString(Apellido_2.valor)) {
      setApellido_2((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setApellido_2((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
      valid = false;
    }
    if (validarInt(Cedula.valor)) {
      setCedula((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setCedula((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
      valid = false;
    }
    if (validarStringInt(Direccion.valor)) {
      setDireccion((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setDireccion((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
      valid = false;
    }
    var regex = /^[UBSM]+$/;
    let validar = regex.test(Nivel_Estudios.valor);

    if (validar === true) {
      setNivel_Estudios((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setNivel_Estudios((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
      valid = false;
    }

    regex = /^[HMT]+$/;
    validar = regex.test(Genero.valor);
    if (validar === true) {
      setGenero((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setGenero((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
      valid = false;
    }

    if (validarString(Oficio.valor)) {
      setOficio((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setOficio((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
      valid = false;
    }

    if (validarFormularioD(FechaN.valor)) {
      setFechaN((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setFechaN((prev) => ({
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
      console.log("error");
    }
  };
  const vs = () => {
    if (validarString(Nombre_1.valor)) {
      setNombre_1((prevNombre) => ({
        ...prevNombre,
        estado: "is-valid",
      }));
    } else {
      setNombre_1((prevNombre) => ({
        ...prevNombre,
        estado: "is-invalid",
      }));
    }
    if (validarString(Nombre_2.valor)) {
      setNombre_2((prevNombre) => ({
        ...prevNombre,
        estado: "is-valid",
      }));
    } else {
      setNombre_2((prevNombre) => ({
        ...prevNombre,
        estado: "is-invalid",
      }));
    }
    if (validarString(Apellido_1.valor)) {
      setApellido_1((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setApellido_1((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
    }
    if (validarString(Apellido_2.valor)) {
      setApellido_2((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setApellido_2((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
    }
    if (validarInt(Cedula.valor)) {
      setCedula((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setCedula((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
    }
    if (validarStringInt(Direccion.valor)) {
      setDireccion((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setDireccion((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
    }
    var regex = /^[UBSM]+$/;
    let validar = regex.test(Nivel_Estudios);
    if (validar === true) {
      setNivel_Estudios((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setNivel_Estudios((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
    }

    regex = /^[HMT]+$/;
    validar = regex.test(Nivel_Estudios);
    if (validar === true) {
      setGenero((prev) => ({
        ...prev,
        estado: "is-valid",
      }));
    } else {
      setGenero((prev) => ({
        ...prev,
        estado: "is-invalid",
      }));
    }
  };
  const Limpiar = () => {
    setEditar("");
    setRepresentante_id("");
    setNombre_1({ valor: "", estado: "" });
    setNombre_2({ valor: "", estado: "" });
    setApellido_1({ valor: "", estado: "" });
    setApellido_2({ valor: "", estado: "" });
    setCedula({ valor: "", estado: "" });
    setDireccion({ valor: "", estado: "" });
    setGenero({ valor: "", estado: "" });
    setNivel_Estudios({ valor: "", estado: "" });
    setOficio({ valor: "", estado: "" });
    setFechaN({ valor: "", estado: "" });
  };
  const Mostrar = () => {
    let url = "http://localhost:3001/Representantes/";
    Axios.post(url)
      .then((res) => {
        // Asigna directamente res.data a ar
        let ar = res.data;

        // Ahora puedes asignar propiedades a los elementos de ar
        for (let i = 0; i < ar.length; i++) {
          ar[i].id = i;
          ar[i].idRepresntate = res.data[i].Id_Representante;

          ar[i].Nombre_1 = res.data[i].Nombre_1;
          ar[i].Apellido_1 = res.data[i].Apellido_1;
          ar[i].Cedula = res.data[i].Cedula;
        }

        setRepresentantes(ar);
      })
      .catch((error) => {
        console.log(error);
      });
    tabla();
  };
  useEffect(() => {
    // Realiza la consulta solo una vez después de cargar la página
    Mostrar();
  }, []);
  return (
    <div className="container">
      <div className="App">
        {/* formulario */}
        <div className="card text-center">
          <div className="card-header">Gestión de Representes</div>
          <div className="card-body">
            <div className="formulario">
              <InputG2
                Titulo={"Nombres"}
                Texto={"#1:"}
                Texto2={"#2:"}
                Tipo={"text"}
                valor1={Nombre_1.valor}
                valor2={Nombre_2.valor}
                estado1={Nombre_1.estado}
                estado2={Nombre_2.estado}
                FDatos={setNombre_1}
                FDatos2={setNombre_2}
                Tipo2={"text"}
                FValidar={validarString}
                FValidar2={validarString}
              />
              <InputG2
                Titulo={"Apellidos"}
                Texto={"#1:"}
                Texto2={"#2:"}
                Tipo={"text"}
                Tipo2={"text"}
                valor1={Apellido_1.valor}
                valor2={Apellido_2.valor}
                estado1={Apellido_1.estado}
                estado2={Apellido_2.estado}
                FDatos={setApellido_1}
                FDatos2={setApellido_2}
                FValidar={validarString}
                FValidar2={validarString}
              />
              <InputKeydown
                Texto={"Cedula"}
                Tipo={"text"}
                max={9}
                min={7}
                valor={Cedula.valor}
                estado={Cedula.estado}
                FDatos={setCedula}
                FValidar={validarInt}
              />
              <SelectorGenero
                valor={Genero.valor}
                estado={Genero.estado}
                FDatos={setGenero}
              />
              <SelectorEducacion
                valor={Nivel_Estudios.valor}
                estado={Nivel_Estudios.estado}
                FDatos={setNivel_Estudios}
              />
              <InputG
                Texto={"Oficio"}
                Tipo={"text"}
                valor={Oficio.valor}
                estado={Oficio.estado}
                FDatos={setOficio}
                FValidar={validarString}
              />
              <InputG
                Texto={"Fecha de Nacimiento"}
                Tipo={"date"}
                valor={FechaN.valor}
                estado={FechaN.estado}
                FValidar={validarFormularioD}
                FDatos={setFechaN}
              />
              <InputTextarea
                Texto={"Dirección"}
                valor={Direccion.valor}
                estado={Direccion.estado}
                FDatos={setDireccion}
                FValidar={validarStringInt}
              />
            </div>
            <div className="card-footer text-body-secondary custom-card-footer">
              {/* <button
                className="btn btn-success"
                onClick={() => {
                  mensaje("mensaje de info", "i", "informacion");
                }}
              >
                info
              </button>
              <button className="btn btn-success">saludar</button> */}
              {Editar !== true ? (
                <button className="btn btn-success" onClick={EnviarDatos}>
                  Enviar
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
              {/* <button className="btn btn-danger" onClick={ValidarDatos}>
                validar
              </button>
              <button className="btn btn-dark" onClick={Mostrar}>
                Mostrar
              </button> */}
            </div>
          </div>

          <br />

          <div className="lista">
            <div>
              <div className="bd-example table table-striped table-hover text-center border-black">
                {/* <table className="table table-striped table-hover text-center border-black">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col" className="display">
                        Primer Nombre
                      </th>
                      <th scope="col">Primer Apellido</th>

                      <th scope="col">Cedula</th>

                      <th scope="col" className="display">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Representantes.length > 0 ? (
                      Representantes.map((val, key) => {
                        return (
                          <tr key={key}>
                            <th scope="row">{1 + key}</th>
                            <td>{val.Nombre_1}</td>
                            <td>{val.Apellido_1}</td>
                            <td>{val.Cedula}</td>

                            <td className="display">
                              <div
                                className="btn-group"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button
                                  type="button"
                                  className="btn btn-primary "
                                  onClick={() => {
                                    editarDatos(val.Id_Representante);
                                  }}
                                >
                                  <p>Editar</p>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    // DesActivar(val.Id_Personal);
                                  }}
                                >
                                  <p> Desactivar</p>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={110}>No hay datos disponibles</td>
                      </tr>
                    )}
                  </tbody>
                </table> */}

                {Representantes.length > 0 ? (
                  <DataTable
                    data={Representantes}
                    columns={columns}
                    fixedHeader
                    pagination
                    paginationPerPage={5}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <DataGrid
        rows={Representantes}
        columns={columns}
        pageSize={2} // Cambia este valor según tus preferencias
        disableSelectionOnClick
      /> */}
      ;
    </div>
  );
};
// const columns = [
//   { Header: "ID", accessor: "id" },
//   { Header: "First Name", accessor: "firstName" },
//   { Header: "Last Name", accessor: "lastName" },
//   { Header: "Age", accessor: "age" },
// ];

// const data = [
//   { id: 1, firstName: "Jon", lastName: "Snow", age: 35 },
//   // ... other data ...
// ];

// <ReactTable data={data} columns={columns} defaultPageSize={5} />;
