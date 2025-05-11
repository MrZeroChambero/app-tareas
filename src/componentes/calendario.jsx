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
import { useNavigate } from "react-router-dom";
import { padding } from "@mui/system";
import img from "./img.png";
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
  const [actividades, setActividades] = useState([]);
  const [defaultView, setDefaultView] = useState("month");
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [nave, setnave] = useState("");
  const navigate = useNavigate();
  // 0 domingo
  // 1 lunes
  // 2 martes
  // 3 miercoles
  // 4 jueves
  // 5 viernes
  // 6 sabado

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

  // const eventos = [
  //   {
  //     id: 1,
  //     title: "Evento 1",
  //     start: new Date(2023, 4, 1, 10, 0), // Fecha y hora de inicio
  //     end: new Date(2024, 4, 10, 12, 0), // Fecha y hora de finalización
  //   },
  //   // ...otros eventos
  // ];
  const Crear_listado_Eventos = (eventos, tareas) => {
    // Agrega las horas y minutos a 'dateValue'
    ////////////////console.log("tareas");

    ////////////////console.log(tareas);
    if (tareas.length > 0) {
      for (let h = 0; h < tareas.length; h++) {
        let timeValue = tareas[h].Hora; // Supongamos que 'time' es una cadena con formato 'HH:MM'
        // Obtén las horas y minutos de 'time'
        let [horas, minutos] = timeValue.split(":");

        let dia = new Date(tareas[h].Fecha);

        dia.setHours(parseInt(horas, 10), parseInt(minutos, 10), 0);

        ////////////////console.log(dia);

        ////////////////console.log();
        eventos.push({
          id: eventos.length + 1,
          title: tareas[h].Tarea,
          start: new Date(dia),
          end: new Date(dia),
          hexColor: "",
        });
      }
      const colors = [
        "ff516b",
        "00BFFF",
        "FFB6C1",
        "9dacff",
        "ff9f6b",
        "00ea52",
        "ffa51e",
      ];

      // Asigna un color aleatorio a cada evento
      eventos.forEach((event, index) => {
        event.hexColor = colors[index % colors.length];
      });
      ////////////////////console.log("baseDatos");
      setActividades(eventos);
    } else {
      setActividades(eventos);
    }
  };

  const ev = (evs) => {
    //////////////////console.log("Asda");
    const eventos = [];
    // const fechaInicio = new Date(2014, 4, 10); // Fecha de

    // const fechaFin = new Date(2024, 4, 10); // Fecha de fin
    // //////////////////console.log(evs.start + " " + evs.end);
    //////////////console.log("baseDatos");
    //////////////console.log(evs);
    // const diasFiltrados = diasSeleccionados.filter(
    //   (dia) => dia.checked === true && dia.id !== 7
    // );

    const MateriasExistentes = evs.filter((evento, index, arr) => {
      return arr.findIndex((e) => e.ID_Ramdon === evento.ID_Ramdon) === index;
    });
    for (let k = 0; k < MateriasExistentes.length; k++) {
      let diasMaterias = evs.filter(
        (eventh) => eventh.ID_Ramdon === MateriasExistentes[k].ID_Ramdon
      );
      //////////////console.log(diasMaterias);
      const fI = MateriasExistentes[k].Dia_incio; // Fecha de inicio
      const fF = MateriasExistentes[k].Dia_Final; // Fecha de fin
      const fechaInicio = new Date(fI); // Fecha de inicio
      const fechaFin = new Date(fF); // Fecha de fin

      // Itera desde la fecha de inicio hasta la fecha de fin
      //////////////console.log("f:");
      ////////////////console.log(evs[0].start);
      for (
        let fecha = fechaInicio;
        fecha <= fechaFin;
        fecha.setDate(fecha.getDate() + 1)
      ) {
        // Excluye los lunes (día de la semana 1) y los sábados (día de la semana 6)
        for (let j = 0; j < diasMaterias.length; j++)
          if (fecha.getDay() === diasMaterias[j].Dia) {
            let fechaiC = new Date(fecha);
            let timeValue = diasMaterias[j].Hora_Inicio;
            let [horas, minutos] = timeValue.split(":");
            ////////////////console.log("tiempo");
            ////////////////console.log(diasMaterias[j]);
            fechaiC.setHours(parseInt(horas, 10), parseInt(minutos, 10), 0);
            let fechaFC = new Date(fecha);
            timeValue = diasMaterias[j].Hora_Final;
            [horas, minutos] = timeValue.split(":");
            fechaFC.setHours(parseInt(horas, 10), parseInt(minutos, 10), 0);
            eventos.push({
              id: eventos.length + 1,
              title: MateriasExistentes[k].Nombre,
              start: new Date(fechaiC),
              end: new Date(fechaFC),
              hexColor: "",
            });
          }
      }
    }
    // //////////////console.log(eventos);
    // Crear_listado_Eventos = (eventos, tareas);
    //setActividades(eventos);
    AgregarTareas(eventos);
    //if (eventos.length > 0) {
    //setActividades(eventos);
    //}
  };
  const AgregarTareas = async (eventh) => {
    const url = "http://localhost:3001/Tareas";

    try {
      const res = await Axios.post(url); // Cambia a Axios.get para obtener datos
      const ar = res.data;

      // Actualiza el estado con los datos
      Crear_listado_Eventos(eventh, ar);
    } catch (error) {
      //////////////console.log("Error al obtener datos:", error);
      // Agrega manejo de errores específico aquí
    }
  };
  // const eventosFiltrados = eventos.filter((evento) => {
  //   const diaSemana = evento.start.getDay();
  //   return diaSemana !== 1 && diaSemana !== 6; // Excluye lunes (1) y sábado (6)
  // });

  // const eventosPorDia = {};
  // eventosFiltrados.forEach((evento) => {
  //   const diaSemana = evento.start.getDay();
  //   if (!eventosPorDia[diaSemana]) {
  //     eventosPorDia[diaSemana] = [];
  //   }
  //   eventosPorDia[diaSemana].push(evento);
  // });

  // const handleEventClick = (event) => {
  //   // Aquí puedes mostrar los detalles del evento (fecha, título, descripción, etc.)
  //   //////////////console.log("Evento seleccionado:", event);
  // };

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    // Llama a ev una vez al cargar el componente

    Mostrar();
  }, []);

  const Mostrar = async () => {
    const url = "http://localhost:3001/Materias/Calendario";

    try {
      const res = await Axios.post(url); // Cambia a Axios.get para obtener datos
      const ar = res.data;
      //////////////console.log(res.data);

      // Formatea las fechas
      ar.forEach((item) => {
        item.FechaI = moment(item.Dia_incio).format("YYYY-MM-DD");
        item.FechaF = moment(item.Dia_Final).format("YYYY-MM-DD");
      });

      // Actualiza el estado con los datos
      ev(ar);
    } catch (error) {
      //////////////console.log("Error al obtener datos:", error);
      // Agrega manejo de errores específico aquí
    }
  };
  const eventStyleGetter = (event) => {
    const backgroundColor = "#" + event.hexColor;
    const style = {
      backgroundColor,
      borderRadius: "0px",
      opacity: 0.9,

      border: "0px",
      display: "block",
    };
    return { style };
  };
  const handleSelect = (date) => {
    setDefaultView("day");
    setDefaultDate(date);
  };
  const CustomToolbar = ({ label, onView, onNavigate }) => {
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

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");

  // Función para manejar los cambios de fecha y vista
  const handleNavigate = (newDate, view) => {
    setCurrentDate(newDate); // Actualiza la fecha actual
    setCurrentView(view); // Actualiza la vista actual
    // Aquí puedes realizar otras acciones según tus necesidades
  };
  const estilos = {
    width: "50px", // Establece el ancho deseado
    height: "50px", // Establece el alto deseado
    objectFit: "cover", // Asegura que la imagen cubra el espacio sin deformarse
  };

  return (
    <div className="container">
      <div className="App">
        <div className="card text-center">
          <div className="card-body">
            <div className="calendario">
              <img src={img} style={estilos} alt="Imagen personalizada" />
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

              <Calendar
                culture="es"
                localizer={localizer}
                messages={messages}
                // components={{
                //   toolbar: CustomToolbar, // Utiliza tu componente personalizado aquí
                // }}
                events={actividades}
                // dayPropGetter={dayPropGetter}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={(event) => handleSelect(event.start)}
                startAccessor="start"
                endAccessor="end"
                // onNavigate={(date) => (date = defaultDate)}
                //date={new Date(currentDate)} // Utiliza la fecha actual
                // view={currentView} // Utiliza la vista actual
              ></Calendar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
