import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import "./tablas.css";
import React, { useRef, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { InputG, InputGT2, InputTextarea } from "./inputS.jsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "moment/locale/es";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendario.css";
import "moment/locale/es"; // Importa el idioma español
import moment from "moment";

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

export const Calendario = () => {
  const [sd, setSd] = useState(false);
  const [actividades, setActividades] = useState([]);
  const [ListaMaterias, setListaMaterias] = useState([]);
  const [nave, setnave] = useState("");
  // 0 domingo
  // 1 lunes
  // 2 martes
  // 3 miercoles
  // 4 jueves
  // 5 viernes
  // 6 sabado

  //   const filteredEvents = eventList.filter((event) => {
  //     const dayOfWeek = event.start.getDay(); // Obtiene el día de la semana (0 = domingo, 6 = sábado)
  //     return dayOfWeek !== 1 && dayOfWeek !== 3; // Filtra los eventos que no son lunes ni miércoles
  //   });
  const CustomToolbar = ({ label, onView, onNavigate }) => {
    setnave(onNavigate);
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button onClick={() => onNavigate("TODAY")}>Hoy</button>
          <button onClick={() => onNavigate("PREV")}>Atrás</button>
          <button onClick={() => onNavigate("NEXT")}>Siguiente</button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
        <span className="rbc-btn-group">
          <button onClick={() => onView(Views.MONTH)}>Mes</button>
          <button onClick={() => onView(Views.WEEK)}>Semana</button>
          <button onClick={() => onView(Views.DAY)}>Día</button>
          <button onClick={() => onView(Views.AGENDA)}>Agenda</button>
        </span>
      </div>
    );
  };
  //   const messages = {
  //     today: "Hoy",
  //     previous: "Atrás",
  //     next: "Siguiente",
  //     agenda: "Agenda", // Cambia el texto para la vista de agenda
  //     // ... otros mensajes personalizados si los necesitas
  //   };
  const messages = {
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    allDay: "Todo el día",
    week: "Semana",
    work_week: "Semana laboral",
    day: "Día",
    month: "Mes",
    previous: "Atrás",
    next: "Siguiente",
    yesterday: "Ayer",
    tomorrow: "Mañana",
    today: "Hoy",
    agenda: "Agenda",
    noEventsInRange: "No hay eventos en este rango.",
    showMore: function showMore(total) {
      return "+" + total + " más";
    },
  };

  const eventos = [
    {
      id: 1,
      title: "Evento 1",
      start: new Date(2023, 4, 1, 10, 0), // Fecha y hora de inicio
      end: new Date(2024, 4, 10, 12, 0), // Fecha y hora de finalización
    },
    // ...otros eventos
  ];

  const ev = (evs) => {
    console.log("Asda");
    const eventos = [];
    // const fechaInicio = new Date(2014, 4, 10); // Fecha de

    // const fechaFin = new Date(2024, 4, 10); // Fecha de fin
    // console.log(evs.start + " " + evs.end);

    const fI = evs[0].start; // Fecha de inicio
    const fF = evs[0].end; // Fecha de fin
    const fechaInicio = new Date(fI); // Fecha de inicio
    const fechaFin = new Date(fF); // Fecha de fin

    // Itera desde la fecha de inicio hasta la fecha de fin
    console.log("f:");
    console.log(evs[0].start);
    for (
      let fecha = fechaInicio;
      fecha <= fechaFin;
      fecha.setDate(fecha.getDate() + 1)
    ) {
      // Excluye los lunes (día de la semana 1) y los sábados (día de la semana 6)
      if (fecha.getDay() !== 1 && fecha.getDay() !== 6) {
        eventos.push({
          id: eventos.length + 1,
          title: `Evento ${eventos.length + 1}`,
          start: new Date(fecha),
          end: new Date(fecha),
        });
      }
    }
    console.log(eventos);
    //if (eventos.length > 0) {
    setActividades(eventos);
    //}
  };
  // console.log(ev(eventos));
  // const events = [
  //   {
  //     title: "Evento importante",
  //     start: new Date(), // Fecha de inicio (hoy)
  //     end: moment().add(10, "years").toDate(), // Fecha de finalización (dentro de 10 años)
  //   },
  //   // Agrega más eventos aquí...
  // ];

  // const eventosFiltrados = eventos.filter((evento) => {
  //   const dayOfWeek = evento.start.getDay();
  //   return dayOfWeek !== 1 && dayOfWeek !== 6; // Excluye lunes y sábados
  // });

  // const dayPropGetter = (date) => {
  //   const dayOfWeek = date.getDay(); // 0 (domingo) a 6 (sábado)
  //   if (dayOfWeek === 1 || dayOfWeek === 6) {
  //     return {
  //       className: "deshabilitado", // Aplica un estilo para ocultar el día
  //     };
  //   }
  //   return {};
  // };

  const diasSemana = {
    0: "domingo",
    1: "lunes",
    2: "martes",
    3: "miércoles",
    4: "jueves",
    5: "viernes",
    6: "sábado",
  };

  const eventosFiltrados = eventos.filter((evento) => {
    const diaSemana = evento.start.getDay();
    return diaSemana !== 1 && diaSemana !== 6; // Excluye lunes (1) y sábado (6)
  });

  const eventosPorDia = {};
  eventosFiltrados.forEach((evento) => {
    const diaSemana = evento.start.getDay();
    if (!eventosPorDia[diaSemana]) {
      eventosPorDia[diaSemana] = [];
    }
    eventosPorDia[diaSemana].push(evento);
  });

  const handleEventClick = (event) => {
    // Aquí puedes mostrar los detalles del evento (fecha, título, descripción, etc.)
    console.log("Evento seleccionado:", event);
  };

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    // Llama a ev una vez al cargar el componente
    ev(eventos);
  }, []);

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
          fechaj = moment(res.data[0].Dia_incio).format("DD/MM/YYYY");
          ar[i].id = res.data[i].id;
          ar[i].FechaI = fechaj;
          fechaj = new Date();
          fechaj = moment(res.data[0].Dia_Final).format("DD/MM/YYYY");
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
  return (
    <div className="container">
      <div className="App">
        <div className="card text-center">
          <div className="card-body">
            <div className="calendario">
              <button
                onClick={() => {
                  ev(eventos);
                }}
              >
                sdad
              </button>
              <Calendar
                culture="es"
                localizer={localizer}
                messages={messages}
                // components={{
                //   toolbar: CustomToolbar, // Utiliza tu componente personalizado aquí
                // }}
                events={actividades}
                // dayPropGetter={dayPropGetter}
                onSelectEvent={handleEventClick} // Llama a esta función al hacer clic en un evento
                endAccessor="end"
              ></Calendar>
            </div>
          </div>
        </div>
      </div>
      {sd === false ? <></> : <></>}
    </div>
  );
};
