import validator, { isDate } from "validator";
export const validarString = (valor) => {
  // var patron = /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ0-9\s]+$/;

  var regex = /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/;

  var m = valor.trim();

  if (!valor) {
    return false;
  }
  if (m === null || m === "") {
    return false;
  }
  return regex.test(m);
};
export const validarStringInt = (valor) => {
  // var patron = /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ0-9\s]+$/;

  var regex = /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚüÜ\s]+$/;

  var m = valor.trim();

  if (!valor) {
    return false;
  }
  if (m === null || m === "") {
    return false;
  }
  return regex.test(m);
};

export const validarInt = (valor) => {
  var regex = /^[0-9]+$/;
  // Intenta convertir la cadena a un número entero
  const numero = parseInt(valor, 10);

  // Verifica si la conversión fue exitosa y si el número es un entero
  if (!isNaN(numero) && Number.isInteger(numero)) {
    // Si es un número entero, verifica si cumple con el patrón regex
    return regex.test(valor);
  }

  // Si no es un número entero, devuelve false
  return false;
};

export const validarFormularioD = (variable) => {
  var fe = new Date(variable);
  var datos = validator.isDate(fe);
  if (datos === false) {
    return false;
  }
  return true;
};
export const validarHora = (horaString) => {
  // Expresión regular para verificar el formato HH:mm
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!regex.test(horaString)) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

    if (!regex.test(horaString)) {
      return false; // Formato incorrecto
    }
  }
  console.log("validar Hora");
  const [horas, minutos] = horaString.split(":");
  const fecha = new Date();
  fecha.setHours(parseInt(horas, 10), parseInt(minutos, 10), 0);

  // Verifica si la hora está entre 9:00 y 18:00
  return fecha.getHours() >= 0 && fecha.getHours() <= 24;
};
export const validarHoraIHoraF = (HoraI, HoraF) => {
  if (HoraF < HoraI) {
    return false;
  } else {
    return true;
  }
};
export const validarHoras = (horaString) => {
  // Expresión regular para verificar el formato HH:mm:ss
  const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

  if (!regex.test(horaString)) {
    return false; // Formato incorrecto
  }

  const [horas, minutos, segundos] = horaString.split(":");
  const fecha = new Date();
  fecha.setHours(
    parseInt(horas, 10),
    parseInt(minutos, 10),
    parseInt(segundos, 10)
  );

  // Verifica si la hora está entre 9:00 y 18:00
  return fecha.getHours() >= 0 && fecha.getHours() <= 24;
};
// export const validarHora = (cadena) => {
//   // Expresión regular para validar el formato HH:MM:SS
//   const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

//   if (regex.test(cadena)) {
//     // La cadena cumple con el formato
//     return true;
//   } else {
//     // La cadena no cumple con el formato
//     return false;
//   }
// };
