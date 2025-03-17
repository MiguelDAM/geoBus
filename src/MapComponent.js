import React, { useState, useEffect, useCallback } from "react";
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";

// Coordenadas aproximadas de las paradas (basadas en búsquedas anteriores)
const PARADAS = {
  exterior: { lat: 28.196, lng: -14.119056 }, // Parada exterior del pueblo
  interior: { lat: 28.193528, lng: -14.116056 }, // Parada interior del pueblo
};

function calcularPosicionIntermedia(start, end, porcentaje) {
  return {
    lat: start.lat + (end.lat - start.lat) * porcentaje,
    lng: start.lng + (end.lng - start.lng) * porcentaje,
  };
}

function MapComponent() {
  const [posicionBus, setPosicionBus] = useState(PARADAS.exterior);
  const [direccion, setDireccion] = useState(true);
  const [animacionActiva, setAnimacionActiva] = useState(true);

  const moverBus = useCallback(() => {
    const destino = direccion ? PARADAS.interior : PARADAS.exterior;
    const duracionViaje = 15000; // 15 segundos por trayecto
    const pasos = 150;
    const intervalo = duracionViaje / pasos;

    let pasoActual = 0;

    const animacion = () => {
      if (pasoActual <= pasos) {
        const progreso = pasoActual / pasos;
        const nuevaPos = calcularPosicionIntermedia(
          direccion ? PARADAS.exterior : PARADAS.interior,
          destino,
          progreso
        );

        setPosicionBus(nuevaPos);
        pasoActual++;
        requestAnimationFrame(animacion);
      } else {
        setDireccion(!direccion);
      }
    };

    requestAnimationFrame(animacion);
  }, [direccion]);

  useEffect(() => {
    if (animacionActiva) {
      const intervalo = setInterval(moverBus, 16000); // 16s por ciclo completo
      return () => clearInterval(intervalo);
    }
  }, [animacionActiva, moverBus]);

  return (
    <APIProvider apiKey="AIzaSyCBFTgzfd9EZt3CgRkBIwab3oSGPzgMWN8">
      <Map
        style={{ width: "100%", height: "600px" }}
        defaultCenter={PARADAS.exterior}
        defaultZoom={15}
        gestureHandling="greedy"
      >
        {/* Marcadores fijos para las paradas */}
        <Marker
          position={PARADAS.exterior}
          title="Parada exterior de Tarajalejo"
          icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        />

        <Marker
          position={PARADAS.interior}
          title="Parada interior de Tarajalejo"
          icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        />

        {/* Marcador móvil para el bus */}
        <AdvancedMarker position={posicionBus} title="Guagua en movimiento">
          <div
            style={{
              fontSize: "2rem",
              transform: `rotate(${direccion ? "90deg" : "270deg"})`,
              transition: "transform 0.5s",
            }}
          >
            🚌
          </div>
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}

export default MapComponent;
