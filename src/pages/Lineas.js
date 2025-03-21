import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../styles/Lineas.css"; // Asegúrate de importar el archivo CSS
import connectWebSocket from "../connections/WebSockets"; // Importa la función WebSocket

const SelectorLineasClases = () => {
  const [lineaSeleccionada, setLineaSeleccionada] = useState("Línea 1: Puerto del Rosario – Morro Jable");
  const contenedorRef = useRef(null); // Referencia al contenedor de las líneas
  const navigate = useNavigate(); // Hook para redirigir

  const lineas = [
    {
      id: 1,
      nombre: "Línea 1: Puerto del Rosario – Morro Jable",
      clase: "boton-linea1",
    },
    {
      id: 2,
      nombre: "Línea 2: Puerto del Rosario – Vega de Río Palmas",
      clase: "boton-linea2",
    },
    {
      id: 3,
      nombre: "Línea 3: Puerto del Rosario – Caleta de Fuste – Las Salinas",
      clase: "boton-linea3",
    },
    { id: 4, nombre: "Línea 4: Pájara – Morro Jable", clase: "boton-linea4" },
    {
      id: 5,
      nombre: "Línea 5: Costa Calma – Morro Jable",
      clase: "boton-linea5",
    },
    {
      id: 6,
      nombre: "Línea 6: Puerto del Rosario – Corralejo",
      clase: "boton-linea6",
    },
    { id: 7, nombre: "Puerto del Rosario – El Cotillo", clase: "boton-linea7" },
    { id: 8, nombre: "Línea 8: Corralejo – El Cotillo", clase: "boton-linea8" },
    { id: 9, nombre: "Línea 9: Pájara – Morro Jable", clase: "boton-linea9" },
    {
      id: 10,
      nombre: "Línea 10: Puerto del Rosario – Morro Jable (por Pozo Negro)",
      clase: "boton-linea10",
    },
    {
      id: 11,
      nombre: "Línea 11: Tuineje – La Lajita – Gran Tarajal",
      clase: "boton-linea11",
    },
    {
      id: 12,
      nombre: "Línea 12: Gran Tarajal – Las Playitas",
      clase: "boton-linea12",
    },
  ];

  const manejarSeleccion = (id) => {
    // Conecta al WebSocket y solicita el nombre de la línea
    connectWebSocket(id, (data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setLineaSeleccionada(data.nombre); // Actualiza el estado con el nombre recibido
        console.log(`Línea seleccionada: ${data.nombre}`);
        navigate(`/map/${id}/ws`); // Redirige a la página con el ID de la línea
      }
    });
  };

  const desplazarIzquierda = () => {
    if (contenedorRef.current) {
      contenedorRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const desplazarDerecha = () => {
    if (contenedorRef.current) {
      contenedorRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="selector-lineas">
      <button className="navegacion-izquierda" onClick={desplazarIzquierda}>
        &lt;
      </button>
      <div className="lineas-list" ref={contenedorRef}>
        {lineas.map((linea) => (
          <button
            key={linea.id}
            onClick={() => manejarSeleccion(linea.id)} // Envía el ID al WebSocket
            className={`boton-linea ${linea.clase} ${
              lineaSeleccionada === linea.nombre ? "linea-seleccionada" : ""
            }`}
          >
            <span>{linea.id}</span> {/* Envuelve el contenido en un span */}
          </button>
        ))}
      </div>
      <button className="navegacion-derecha" onClick={desplazarDerecha}>
        &gt;
      </button>
    </div>
  );
};

export default SelectorLineasClases;
