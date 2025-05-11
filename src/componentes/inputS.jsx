import React, { useRef, useEffect } from "react";
import "./InpuG.css";
import e from "cors";
import { useState } from "react";
import Cleave from "cleave.js/react";
import { el } from "date-fns/locale";
export const InputG = ({
  Texto,
  Tipo,
  estado,
  valor,
  FValidar,
  FDatos,
  max,
  min,
}) => {
  const clase = "form-control  " + estado;
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        {Texto}
      </span>
      <input
        type={Tipo}
        className={clase}
        autoComplete="off"
        required
        maxLength={max}
        minLength={min}
        value={valor}
        onChange={(event) => {
          if (event.target.value.trim() === "") {
            event.target.value = "";
          }
          const newValue = event.target.value.replace(/\s+/g, " ");
          let validar = FValidar(newValue);
          if (validar === true) {
            FDatos({ valor: newValue, estado: "is-valid" });
          } else if (validar !== true && newValue === "") {
            FDatos({ valor: newValue, estado: "is-invalid" });
          }
        }}
      />
    </div>
  );
};
export const InputKeydown = ({
  Texto,
  Tipo,
  FValidar,
  FDatos,
  estado,
  valor,
  max,
  min,
}) => {
  //const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    event.target.value.replace(/  +/g, " ");
    // const sanitizedValue = newValue.replace(/  +/g, " "); // Reemplaza 2 o más espacios por 1 solo espacio
    //setInputValue(sanitizedValue);
  };
  const clase = "form-control " + estado;
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        {Texto}
      </span>
      <input
        type={Tipo}
        className={clase}
        autoComplete="off"
        required
        value={valor}
        maxLength={max}
        minLength={min}
        onKeyDown={(event) => {
          // Verifica si la tecla presionada es un número o la tecla de borrar
          if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();
          }
          handleInputChange(event);
        }}
        onChange={(event) => {
          if (event.target.value.trim() === "") {
            event.target.value = "";
          }
          const newValue = event.target.value.replace(/\s+/g, " ");
          let validar = FValidar(newValue);
          if (validar === true) {
            FDatos({ valor: newValue, estado: "is-valid" });
          } else if (validar !== true && newValue === "") {
            FDatos({ valor: newValue, estado: "is-invalid" });
          }
        }}
      />
    </div>
  );
};

export const InputG2 = ({
  Titulo,
  Texto,
  Texto2,
  Tipo,
  Tipo2,
  estado1,
  estado2,
  valor1,
  valor2,
  FDatos,
  FDatos2,
  FValidar,
  FValidar2,
}) => {
  const clase1 = "form-control " + estado1;
  const clase2 = "form-control " + estado2;
  const patronString = /[^A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/;
  const patronInt = /[^0-9]+$/;
  const patronCompleto = /[^A-Za-z0-9ñÑáéíóúÁÉÍÓÚüÜ\s]+$/;
  let patron = "";

  return (
    <div className="input-group mb-3">
      <div className="input-group align-items-center justify-content-center">
        <span className="form-control fondo-gris" id="basic-addon1">
          {Titulo}
        </span>
      </div>
      <span className="input-group-text" id="basic-addon1">
        {Texto}
      </span>
      <input
        type={Tipo}
        value={valor1}
        className={clase1}
        autoComplete="off"
        required
        onChange={(event) => {
          if (event.target.value.trim() === "") {
            event.target.value = "";
          }
          const newValue = event.target.value.replace(/\s+/g, " ");
          let validar = FValidar(newValue);
          if (validar === true) {
            FDatos({ valor: newValue, estado: "is-valid" });
          } else if (validar !== true && newValue === "") {
            FDatos({ valor: newValue, estado: "is-invalid" });
          }
        }}
      />
      <span className="input-group-text" id="basic-addon1">
        {Texto2}
      </span>
      <input
        type={Tipo2}
        value={valor2}
        className={clase2}
        autoComplete="off"
        required
        onChange={(event) => {
          if (event.target.value.trim() === "") {
            event.target.value = "";
          }
          const newValue = event.target.value.replace(/\s+/g, " ");
          let validar = FValidar2(newValue);
          if (validar === true) {
            FDatos2({ valor: newValue, estado: "is-valid" });
          } else if (validar !== true && newValue === "") {
            FDatos2({ valor: newValue, estado: "is-invalid" });
          }
        }}
      />
    </div>
  );
};
export const InputGT = ({
  Texto,
  Texto2,
  Texto3,
  Texto4,
  Tipo,
  valor1,
  valor2,
  valor3,
  estado1,
  estado2,
  estado3,
  FValidar,
  FValidar2,
  FValidar3,
  FDatos1,
  FDatos2,
  FDatos3,
}) => {
  const clase1 = "form-control " + estado1;
  const clase2 = "form-control " + estado2;
  const clase3 = "form-control " + estado2;

  return (
    <>
      <div className="input-group align-items-center justify-content-center">
        <span className="form-control fondo-gris" id="basic-addon1">
          {Texto}
        </span>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          {Texto2}
        </span>
        <input
          type={Tipo}
          value={valor1}
          className={clase1}
          autoComplete="off"
          required
          onKeyDown={(event) => {
            // Verifica si la tecla presionada es un número o la tecla de borrar
            if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
              event.preventDefault();
            }
          }}
          onChange={(event) => {
            if (event.target.value.trim() === "") {
              event.target.value = "";
            }
            const newValue = event.target.value.replace(/\s+/g, " ");
            let validar = FValidar(newValue);
            if (validar === true) {
              FDatos1({ valor: newValue, estado: "is-valid" });
            } else if (validar !== true && newValue === "") {
              FDatos1({ valor: newValue, estado: "is-invalid" });
            } else {
              FDatos1((prevNombre) => ({
                ...prevNombre,
                estado: "is-invalid",
              }));
            }
          }}
        />
        <span className="input-group-text" id="basic-addon1">
          {Texto3}
        </span>
        <input
          type={Tipo}
          value={valor2}
          className={clase2}
          autoComplete="off"
          required
          onKeyDown={(event) => {
            // Verifica si la tecla presionada es un número o la tecla de borrar
            if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
              event.preventDefault();
            }
          }}
          onChange={(event) => {
            if (event.target.value.trim() === "") {
              event.target.value = "";
            }
            const newValue = event.target.value.replace(/\s+/g, " ");
            let validar = FValidar2(newValue);
            if (validar === true) {
              FDatos2({ valor: newValue, estado: "is-valid" });
            } else if (validar !== true && newValue === "") {
              FDatos2({ valor: newValue, estado: "is-invalid" });
            } else {
              FDatos2((prevNombre) => ({
                ...prevNombre,
                estado: "is-invalid",
              }));
            }
          }}
        />

        <span className="input-group-text" id="basic-addon1">
          {Texto4}
        </span>
        <input
          type={Tipo}
          value={valor3}
          className={clase3}
          autoComplete="off"
          required
          onKeyDown={(event) => {
            // Verifica si la tecla presionada es un número o la tecla de borrar
            if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
              event.preventDefault();
            }
          }}
          onChange={(event) => {
            if (event.target.value.trim() === "") {
              event.target.value = "";
            }
            const newValue = event.target.value.replace(/\s+/g, " ");
            let validar = FValidar3(newValue);
            if (validar === true) {
              FDatos3({ valor: newValue, estado: "is-valid" });
            } else if (validar !== true && newValue === "") {
              FDatos3({ valor: newValue, estado: "is-invalid" });
            } else {
              FDatos3((prevNombre) => ({
                ...prevNombre,
                estado: "is-invalid",
              }));
            }
          }}
        />
      </div>
    </>
  );
};
export const SelectorGenero = ({ valor, FDatos, estado }) => {
  const clase = "form-control " + estado;
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        Genero:
      </span>
      <select
        className={clase}
        name="genero"
        value={valor}
        required
        onChange={(event) => {
          var regex = /^[HMT]+$/;
          let validar = regex.test(event.target.value);
          if (validar === true) {
            FDatos({ valor: event.target.value, estado: "is-valid" });
          } else {
            FDatos({ valor: "", estado: "is-invalid" });
          }
        }}
      >
        <option value="">Seleccionar</option>
        <option value="H">Hombre</option>
        <option value="M">Mujer</option>
        <option value="T">Terraneitor</option>
      </select>
    </div>
  );
};
export const SelectorEducacion = ({ valor, FDatos, estado }) => {
  const clase = "form-control " + estado;
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        Nivel de Educación:
      </span>
      <select
        className={clase}
        name="Nivel"
        value={valor}
        required
        onChange={(event) => {
          var regex = /^[UBSM]+$/;
          let validar = regex.test(event.target.value);
          if (validar === true) {
            FDatos({ valor: event.target.value, estado: "is-valid" });
          } else {
            FDatos({ valor: "", estado: "is-invalid" });
          }
        }}
      >
        <option value="">Seleccionar</option>
        <option value="U">Universitaria</option>
        <option value="B">Bachiller</option>
        <option value="S">6° Grado</option>
        <option value="M">Sin estudios</option>
      </select>
    </div>
  );
};

export const InputTextarea = ({ Texto, valor, FValidar, FDatos, estado }) => {
  const clase = "form-control " + estado;
  return (
    <div className="input-group mb-3">
      <span className="input-group-text align-content-around" id="basic-addon1">
        {Texto}
      </span>

      <textarea
        value={valor}
        onChange={(event) => {
          if (event.target.value.trim() === "") {
            event.target.value = "";
          }
          const newValue = event.target.value.replace(/\s+/g, " ");
          const filteredValue = newValue;
          // const filteredValue = newValue.replace(
          //   /[^A-Za-z0-9ñÑáéíóúÁÉÍÓÚüÜ\s]+$/,
          //   ""
          // );
          event.target.value = filteredValue;
          let validar = FValidar(filteredValue);
          if (validar === true) {
            FDatos({ valor: filteredValue, estado: "is-valid" });
          } else if (validar !== true && filteredValue === "") {
            FDatos({ valor: filteredValue, estado: "is-invalid" });
          }
        }}
        className={clase}
        rows={4} // Puedes ajustar la cantidad de filas según tus necesidades
        cols={40} // Puedes ajustar el ancho en caracteres
      />
    </div>
  );
};

export const MyInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value.replace(/\s+/g, " "); // Elimina espacios adicionales
    setInputValue(newValue);
  };

  return <input type="text" value={inputValue} onChange={handleChange} />;
};

export const creditCard = () => {
  const handleChange = (event) => {
    // Valor formateado
    console.log(event.target.value);
    // Valor sin formato
    console.log(event.target.rawValue);
  };

  return (
    <Cleave
      placeholder="Ingresa tu número de tarjeta de crédito"
      options={{ creditCard: true }}
      onChange={handleChange}
    />
  );
};
export const InputCC = () => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Filtrar solo números

    const filteredValue = value.replace(/[^A-Za-z0-9ñÑáéíóúÁÉÍÓÚüÜ\s]+$/, "");
    setInputValue(filteredValue);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Ingresa solo números"
    />
  );
};

function CustomInput() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Filtrar solo letras mayúsculas y minúsculas
    const filteredValue = value.replace(/[^A-Za-z]/g, "");
    setInputValue(filteredValue);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Ingresa solo letras"
      pattern="[A-Za-z]+"
    />
  );
}

// onChange={(event) => {
//   if (event.target.value.trim() === "") {
//     event.target.value = "";
//   }
//   const newValue = event.target.value.replace(/\s+/g, " ");
//   let validar = FValidar2(newValue);
//   if (validar === true) {
//     FDatos2({ valor: newValue, estado: "is-valid" });
//   } else if (validar !== true && newValue === "") {
//     FDatos2({ valor: newValue, estado: "is-invalid" });
//   } else {
//     FDatos2((prevNombre) => ({
//       ...prevNombre,
//       estado: "is-invalid",
//     }));
//   }
export const InputGT2 = ({
  Titulo,
  Texto,
  Texto2,
  Tipo,
  Tipo2,
  estado1,
  estado2,
  valor1,
  valor2,
  FDatos,
  FDatos2,
  FValidar,
  FValidar2,
}) => {
  const clase1 = "form-control " + estado1;
  const clase2 = "form-control " + estado2;
  const patronString = /[^A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/;
  const patronInt = /[^0-9]+$/;
  const patronCompleto = /[^A-Za-z0-9ñÑáéíóúÁÉÍÓÚüÜ\s]+$/;
  let patron = "";

  return (
    <div className="input-group mb-3">
      <div className="input-group align-items-center justify-content-center"></div>
      <span className="input-group-text" id="basic-addon1">
        {Texto}
      </span>
      <input
        type={Tipo}
        value={valor1}
        className={clase1}
        autoComplete="off"
        required
        onChange={(event) => {
          if (event.target.value.trim() === "") {
            event.target.value = "";
          }
          const newValue = event.target.value.replace(/\s+/g, " ");
          let validar = FValidar(newValue);
          if (validar === true) {
            FDatos({ valor: newValue, estado: "is-valid" });
          } else if (validar !== true && newValue === "") {
            FDatos({ valor: newValue, estado: "is-invalid" });
          }
        }}
      />
      <span className="input-group-text" id="basic-addon1">
        {Texto2}
      </span>
      <input
        type={Tipo2}
        value={valor2}
        className={clase2}
        autoComplete="off"
        required
        onChange={(event) => {
          if (event.target.value.trim() === "") {
            event.target.value = "";
          }

          const newValue = event.target.value.replace(/\s+/g, " ");
          let validar = FValidar2(newValue);
          if (validar === true) {
            FDatos2({ valor: newValue, estado: "is-valid" });
          } else if (validar !== true || newValue === "") {
            FDatos2({ valor: newValue, estado: "is-invalid" });
          }
        }}
      />
    </div>
  );
};

export const InputGT2F = ({
  Titulo,
  Texto,
  Texto2,
  Tipo,
  Tipo2,
  estado1,
  estado2,
  valor1,
  valor2,
  FDatos,
  FDatos2,
  FValidar,
  FValidar2,
}) => {
  const clase1 = "form-control " + estado1;
  const clase2 = "form-control " + estado2;
  const patronString = /[^A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/;
  const patronInt = /[^0-9]+$/;
  const patronCompleto = /[^A-Za-z0-9ñÑáéíóúÁÉÍÓÚüÜ\s]+$/;
  let patron = "";

  return (
    <div className="input-group mb-3">
      <div className="input-group align-items-center justify-content-center"></div>
      <span className="input-group-text" id="basic-addon1">
        {Texto}
      </span>
      <input
        type={Tipo}
        value={valor1}
        className={clase1}
        autoComplete="off"
        required
        onChange={(event) => {
          if (event.target.value.trim() === "") {
            event.target.value = "";
          }
          const newValue = event.target.value.replace(/\s+/g, " ");
          let validar = FValidar(newValue);
          if (validar === true) {
            FDatos({ valor: newValue, estado: "is-valid" });
          } else if (validar !== true && newValue === "") {
            FDatos({ valor: newValue, estado: "is-invalid" });
          }
          if (newValue > valor2) {
            FDatos({ valor: newValue, estado: "is-invalid" });
            FDatos2((prevNombre) => ({
              ...prevNombre,
              estado: "is-invalid",
            }));
          } else {
            FDatos2((prevNombre) => ({
              ...prevNombre,
              estado: "is-valid",
            }));
          }
        }}
      />
      <span className="input-group-text" id="basic-addon1">
        {Texto2}
      </span>
      <input
        type={Tipo2}
        value={valor2}
        className={clase2}
        autoComplete="off"
        required
        onChange={(event) => {
          if (event.target.value.trim() === "") {
            event.target.value = "";
          }

          const newValue = event.target.value.replace(/\s+/g, " ");
          let validar = FValidar2(newValue);
          if (validar === true) {
            FDatos2({ valor: newValue, estado: "is-valid" });
          } else if (validar !== true && newValue === "") {
            FDatos2({ valor: newValue, estado: "is-invalid" });
          }
          if (newValue < valor1) {
            FDatos2({ valor: newValue, estado: "is-invalid" });
            FDatos((prevNombre) => ({
              ...prevNombre,
              estado: "is-invalid",
            }));
          } else {
            FDatos((prevNombre) => ({
              ...prevNombre,
              estado: "is-valid",
            }));
          }
        }}
      />
    </div>
  );
};

export const InputGT2H = ({
  Titulo,
  Texto,
  Texto2,
  Tipo,
  Tipo2,
  id,
  estado1,
  estado2,
  valor1,
  valor2,
  FDatos,
  FDatos2,
  FValidar,
  FValidar2,
}) => {
  const clase1 = "form-control " + estado1;
  const clase2 = "form-control " + estado2;

  return (
    <div className="input-group mb-3">
      <div className="input-group align-items-center justify-content-center">
        <span className="form-control fondo-gris" id="basic-addon1">
          {Titulo}
        </span>
      </div>
      <div className="input-group align-items-center justify-content-center"></div>
      <span className="input-group-text" id="basic-addon1">
        {Texto}
      </span>
      <input
        type={Tipo}
        value={valor1}
        className={clase1}
        autoComplete="off"
        required
        onChange={(event) => {
          if (event.target.value.trim() === "") {
            event.target.value = "";
          }
          const newValue = event.target.value.replace(/\s+/g, " ");
          let validar = FValidar(newValue);
          if (validar === true) {
            FDatos((prevDias) => {
              return prevDias.map((horas) =>
                horas.id === id
                  ? { ...horas, estadoI: "is-valid", HoraI: newValue }
                  : horas
              );
            });
          } else if (validar !== true || newValue === "") {
            FDatos((prevDias) => {
              return prevDias.map((horas) =>
                horas.id === id
                  ? { ...horas, estadoI: "is-invalid", HoraI: newValue }
                  : horas
              );
            });
          }

          if (valor2 < newValue) {
            FDatos((prevDias) => {
              return prevDias.map((horas) =>
                horas.id === id
                  ? { ...horas, estadoI: "is-invalid", estadoF: "is-invalid" }
                  : horas
              );
            });
          } else {
            FDatos((prevDias) => {
              return prevDias.map((horas) =>
                horas.id === id
                  ? {
                      ...horas,
                      estadoI: "is-valid",
                      estadoF: "is-valid",
                    }
                  : horas
              );
            });
          }
        }}
      />
      <span className="input-group-text" id="basic-addon1">
        {Texto2}
      </span>
      <input
        type={Tipo2}
        value={valor2}
        className={clase2}
        autoComplete="off"
        required
        onChange={(event) => {
          if (event.target.value.trim() === "") {
            event.target.value = "";
          }
          const newValue = event.target.value.replace(/\s+/g, " ");
          let validar = FValidar(newValue);
          if (validar === true) {
            FDatos((prevDias) => {
              return prevDias.map((horas) =>
                horas.id === id
                  ? { ...horas, estadoF: "is-valid", HoraF: newValue }
                  : horas
              );
            });
          } else if (validar !== true || newValue === "") {
            FDatos((prevDias) => {
              return prevDias.map((horas) =>
                horas.id === id
                  ? { ...horas, estadoF: "is-invalid", HoraF: newValue }
                  : horas
              );
            });
          }

          if (newValue < valor1) {
            FDatos((prevDias) => {
              return prevDias.map((horas) =>
                horas.id === id
                  ? { ...horas, estadoI: "is-invalid", estadoF: "is-invalid" }
                  : horas
              );
            });
          } else {
            FDatos((prevDias) => {
              return prevDias.map((horas) =>
                horas.id === id
                  ? {
                      ...horas,
                      estadoI: "is-valid",
                      estadoF: "is-valid",
                    }
                  : horas
              );
            });
          }
        }}
      />
    </div>
  );
};
