import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import validator, { isDate } from "validator";
import React, { useRef, useEffect } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const moment = require("moment");

// var moment = require("moment");
// var fechaHora = new Date(); // tu variable Date con fecha y hora
// var fechaFormateada = moment(fechaHora).format("DD-MM-YYYY");
// var horaFormateada = moment(fechaHora).add(24, "hours").format("HH:mm");

const Alertas = withReactContent(Swal);
const saludo = () => {
  Alertas.fire({
    title: <p>Hello World</p>,
    didOpen: () => {
      // `MySwal` is a subclass of `Swal` with all the same instance & static methods
      Alertas.showLoading();
    },
  }).then(() => {
    return Alertas.fire(<p>Shorthand works too</p>);
  });
};
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

function App() {
  //enviar
  const [Nombre1, setNombre1] = useState("");
  const [Nombre2, setNombre2] = useState("");
  const [Cedula, setCedula] = useState(0);
  const [Apellido1, setApellido1] = useState("");
  const [Apellido2, setApellido2] = useState("");
  const [Cargo, setCargo] = useState("");
  const [Genero, setGenero] = useState("");
  const [FechaN, setFechaN] = useState("");

  const nombre1 = useRef(null);
  const nombre2 = useRef(null);
  const apellido1 = useRef(null);
  const apellido2 = useRef(null);
  const cedula = useRef(null);
  const cargo = useRef(null);
  const fecha = useRef(null);
  const genero = useRef(null);
  //editar
  const [Editar, setEditar] = useState(false);
  const [personal_Id, setId_pesonal] = useState("");

  const [DatosActualizar, setDatosA] = useState([]);

  const editarDatos = (id) => {
    buscarId(id);
  };
  const buscarId = (id_p) => {
    Axios.post("http://localhost:3001/Personal/Buscar", { id: id_p })
      .then((res) => {
        if (res.data !== "" && res.data !== undefined && res.data !== null) {
          let fechaj = new Date();
          fechaj = moment(res.data[0].Fecha_Nacimiento).format("YYYY-MM-DD");
          console.log(fechaj);
          nombre1.current.value = res.data[0].Nombre_1;
          nombre2.current.value = res.data[0].Nombre_2;
          apellido1.current.value = res.data[0].Apellido_1;
          apellido2.current.value = res.data[0].Apellido_2;
          cedula.current.value = res.data[0].Cedula;
          cargo.current.value = res.data[0].Cargo;
          fecha.current.value = fechaj;
          genero.current.value = res.data[0].Genero;
          setId_pesonal(res.data[0].Id_Personal);
          setEditar(true);
        } else {
          alert("no se encontraron datos");
        }
      })
      .catch((error) => {
        alert("error en la consulta");
        console.log(error);
      });
  };
  const DesActivar = () => {};
  const Activar = () => {};
  //obtener
  //se utiliza [] para dar a entender que es un arry vacio
  const [PersonalLista, setPersonal] = useState([]);

  const enviarDatos = () => {
    console.log(nombre1);
    validar();
  };

  const agregar = () => {
    let url = "http://localhost:3001/Personal/Crear";
    if (Editar === true) {
      url = "http://localhost:3001/Personal/Actualizar";
    }
    Axios.post(url, {
      Nombre1: nombre1.current.value,
      Nombre2: nombre2.current.value,
      Apellido1: apellido1.current.value,
      Apellido2: apellido2.current.value,
      Cedula: cedula.current.value,
      Genero: genero.current.value,
      Cargo: cargo.current.value,
      FechaN: fecha.current.value,
      id: personal_Id,
    }).then((res) => {
      //luego de enviar los datos
      Mostrar();
      if (res.data === true && Editar === true) {
        limpiar();
        mensaje(
          "Actualización exitosa",
          "s",
          "Los datos se actualizaron correctamente"
        );
      } else if (res.data === false && Editar === true) {
        mensaje("Error", "e", "Error al Actualizar");
      }
      if (res.data === true && Editar !== true) {
        limpiar();
        mensaje("Resgistro completo", "s", "Se registraron los datos");
      } else if (res.data === false && Editar !== true) {
        mensaje("Error", "e", "Error al registrar");
      }
    });
  };
  const validarFormularioS = (variable) => {
    var datos = validarString(variable);
    if (datos === false) {
      variable.current.classList.remove("is-valid");
      variable.current.classList.add("is-invalid");
      return false;
    } else {
      variable.current.classList.remove("is-invalid");
      variable.current.classList.add("is-valid");
      return true;
    }
  };
  const validarFormularioD = (variable) => {
    var fe = new Date(variable.current.value);
    var datos = validator.isDate(fe);

    if (datos === false) {
      variable.current.classList.remove("is-valid");
      variable.current.classList.add("is-invalid");
      return false;
    } else {
      variable.current.classList.remove("is-invalid");
      variable.current.classList.add("is-valid");
      return true;
    }
  };
  const validarFormularioInt = (variable) => {
    var datos = validarInt(variable);
    if (datos === false) {
      variable.current.classList.remove("is-valid");
      variable.current.classList.add("is-invalid");
      return false;
    } else {
      variable.current.classList.remove("is-invalid");
      variable.current.classList.add("is-valid");
      return true;
    }
  };
  const ingresarDatos = () => {
    alert("ingresnado" + apellido1.current);
    setApellido1(apellido1.current.value);
    setApellido2(apellido2.current.value);
    setNombre1(nombre1.current.value);
    setNombre2(nombre2.current.value);
    setCargo(cargo.current.value);
    setCedula(cedula.current.value);
    setFechaN(new Date(fecha.current.value));
    setGenero(genero.current.value);
    agregar();
    // useEffect(() => {
    //   agregar();
    // }, [Nombre1, Nombre2, Cedula, Apellido1, Apellido2, Cargo, Genero, FechaN]);
  };

  const cambiarCss = () => {
    nombre1.current.classList.remove("is-valid");
    nombre1.current.classList.remove("is-invalid");
    nombre2.current.classList.remove("is-valid");
    nombre2.current.classList.remove("is-invalid");
    apellido1.current.classList.remove("is-invalid");
    apellido1.current.classList.remove("is-valid");
    apellido2.current.classList.remove("is-invalid");
    apellido2.current.classList.remove("is-valid");
    cedula.current.classList.remove("is-valid");
    cedula.current.classList.remove("is-invalid");
    cargo.current.classList.remove("is-valid");
    cargo.current.classList.remove("is-invalid");
    fecha.current.classList.remove("is-valid");
    fecha.current.classList.remove("is-invalid");
    genero.current.classList.remove("is-valid");
    genero.current.classList.remove("is-invalid");
  };
  const limpiar = () => {
    nombre1.current.value = "";
    nombre2.current.value = "";
    apellido1.current.value = "";
    apellido2.current.value = "";
    cedula.current.value = "";
    cargo.current.value = "";
    fecha.current.value = "";
    genero.current.value = "";
    cambiarCss();
    setApellido1("");
    setApellido2("");
    setCargo("");
    setGenero("");
    setCedula("");
    setFechaN("");
    setNombre1("");
    setNombre2("");
    setId_pesonal("");
    setEditar(false);
  };

  //var elemento = document.getElementById("miElemento");

  // Cambia la clase del elemento usando className
  //elemento.className = "nuevaClase";

  // O puedes agregar una nueva clase al elemento existente usando classList.add
  //elemento.classList.add("otraClase");

  // También puedes eliminar una clase existente usando classList.remove
  // elemento.classList.remove("claseAntigua");
  const validar = () => {
    let error = "";
    error = validarDatos();
    if (error === "") {
      ingresarDatos();
    } else {
      alert("error:" + error);
    }
  };
  const validarDatos = () => {
    let datos = true;
    let error = "";
    datos = validarFormularioS(nombre1);
    if (datos !== true) {
      error = +"nombre1;";
    }
    datos = validarFormularioS(nombre2);
    if (datos !== true) {
      error = +"nombre2;";
    }
    datos = validarFormularioS(apellido1);
    if (datos !== true) {
      error = +"apellido1;";
    }
    datos = validarFormularioS(apellido2);
    if (datos !== true) {
      error = +"apellido2;";
    }
    datos = validarFormularioInt(cedula);
    if (datos !== true) {
      error = +"cedula;";
    }
    datos = validarFormularioS(cargo);
    if (datos !== true) {
      error = +"cargo;";
    }
    datos = validarFormularioD(fecha);
    if (datos !== true) {
      error = +"fecha;";
    }
    datos = validarFormularioS(genero);
    if (datos !== true) {
      error = +"genero;";
    }
    return error;
  };
  const validarString = (valor) => {
    // var patron = /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ0-9\s]+$/;

    var regex = /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/;
    // console.log(valor);
    var m = valor.current.value.trim();

    if (!valor) {
      return false;
    }
    if (m === null || m === "") {
      return false;
    }
    return regex.test(m);
  };
  const validarInt = (valor) => {
    var regex = /^[0-9]+$/;

    if (Number.isInteger(valor.current.value)) {
      return false;
    }
    return regex.test(valor.current.value);
  };

  const Mostrar = () => {
    Axios.post("http://localhost:3001/Personal")
      .then((res) => {
        //estoy asignando a la variable personal todos los datos recibidos en la respuesta
        setPersonal(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    // Realiza la consulta solo una vez después de cargar la página
    Mostrar();
  }, []); // El arreglo vacío asegura que se ejecute solo una vez
  return (
    <div className="container">
      <div className="App">
        {/* formulario */}
        <div className="card text-center">
          <div className="card-header">Gestion de Personal</div>
          <div className="card-body">
            <div className="">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Nombre 1:
                </span>
                <input
                  type="text"
                  ref={nombre1}
                  className="form-control"
                  autoComplete="off"
                  onChange={() => {
                    validarFormularioS(nombre1);
                  }}
                />
                <span className="input-group-text" id="basic-addon1">
                  Nombre 2:
                </span>
                <input
                  type="text"
                  ref={nombre2}
                  className="form-control"
                  autoComplete="off"
                  required
                  onChange={() => {
                    validarFormularioS(nombre2);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Apellido 1:</span>
                <input
                  type="text"
                  ref={apellido1}
                  autoComplete="off"
                  className="form-control"
                  required
                  onChange={() => {
                    validarFormularioS(apellido1);
                  }}
                />
                <span className="input-group-text">Apellido 2:</span>
                <input
                  type="text"
                  ref={apellido2}
                  autoComplete="off"
                  className="form-control"
                  required
                  onChange={() => {
                    validarFormularioS(apellido2);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Cedula:
                </span>
                <input
                  type="number"
                  ref={cedula}
                  className="form-control"
                  autoComplete="off"
                  required
                  onChange={() => {
                    validarFormularioInt(cedula);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Genero:
                </span>
                <select
                  className="form-control"
                  name="genero"
                  ref={genero}
                  required
                  onChange={() => {
                    validarFormularioS(genero);
                  }}
                >
                  <option value="">Seleccionar</option>
                  <option value="H">Hombre</option>
                  <option value="M">Mujer</option>
                  <option value="T">Terraneitor</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Cargo:
                </span>
                <input
                  required
                  className="form-control"
                  type="text"
                  ref={cargo}
                  autoComplete="off"
                  onChange={() => {
                    validarFormularioS(cargo);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Fecha de <br />
                  Nacimiento
                </span>
                <input
                  type="date"
                  required
                  ref={fecha}
                  autoComplete="off"
                  className="form-control"
                  onChange={() => {
                    validarFormularioD(fecha);
                  }}
                />
              </div>
            </div>
            <div className="card-footer text-body-secondary">
              <button
                className="btn btn-success"
                onClick={() => {
                  mensaje("mensaje de info", "i", "informacion");
                }}
              >
                info
              </button>
              <button className="btn btn-success" onClick={saludo}>
                saludar
              </button>
              {Editar !== true ? (
                <button className="btn btn-success" onClick={enviarDatos}>
                  Enviar
                </button>
              ) : (
                <>
                  <button className="btn btn-warning" onClick={enviarDatos}>
                    Actualizar
                  </button>
                  <button className="btn btn-danger" onClick={limpiar}>
                    Cancelar
                  </button>
                </>
              )}
              {/* <button className="btn btn-danger" onClick={validarDatos}>
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
              <div className="bd-example">
                <table className="table table-striped table-hover text-center border-black">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">
                        Primer <br /> Nombre
                      </th>
                      <th scope="col" className="display">
                        Segundo <br /> Nombre
                      </th>
                      <th scope="col">
                        Primer <br /> Apellido
                      </th>
                      <th scope="col" className="display">
                        Segundo <br /> Apellido
                      </th>
                      <th scope="col">Cedula</th>
                      <th scope="col" className="display">
                        Genero
                      </th>
                      <th scope="col" className="display">
                        Cargo
                      </th>
                      <th scope="col" className="display">
                        Fecha de <br />
                        Nacimiento
                      </th>
                      <th scope="col" className="display">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PersonalLista.length > 0 ? (
                      PersonalLista.map((val, key) => {
                        var i = 1;

                        return (
                          <tr key={key}>
                            <th scope="row">{i + key}</th>
                            <td>{val.Nombre_1}</td>
                            <td className="display">{val.Nombre_2}</td>
                            <td>{val.Apellido_1}</td>
                            <td className="display">{val.Apellido_2}</td>
                            <td>{val.Cedula}</td>
                            <td className="display">{val.Genero}</td>
                            <td className="display">{val.Cargo}</td>
                            <td className="display">
                              {moment(val.Fecha_Nacimiento).format(
                                "DD/MM/YYYY"
                              )}
                            </td>
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
                                    editarDatos(val.Id_Personal);
                                  }}
                                >
                                  <p>Editar</p>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    DesActivar(val.Id_Personal);
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
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { App };
