<<<<<<< HEAD
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
=======
import React, { useState, useEffect, useRef } from 'react';

const BUS_STOPS = {
    exterior: { lat: 28.195838, lng: -14.11906 },
    interior: { lat: 28.193528, lng: -14.116056 },
};

// Predefined points that define the bus route
const ROAD_POINTS = [
    { lat: BUS_STOPS.exterior.lat, lng: BUS_STOPS.exterior.lng },
    { lat: 28.195764, lng: -14.118529 },
    { lat: 28.195624, lng: -14.118296 },
    { lat: 28.195752, lng: -14.11795 },
    { lat: 28.196074, lng: -14.117107 },
    { lat: 28.196331, lng: -14.116405 },
    { lat: 28.196591, lng: -14.115774 },
    { lat: 28.196683, lng: -14.115418 },
    { lat: 28.1964, lng: -14.115222 },
    { lat: 28.195267, lng: -14.115377 },
    { lat: 28.194894, lng: -14.115439 },
    { lat: 28.194565, lng: -14.115503 },
    { lat: 28.194083, lng: -14.115707 },
    { lat: BUS_STOPS.interior.lat, lng: BUS_STOPS.interior.lng },
];

function MapComponent() {
    const [mapsLoaded, setMapsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);
    const busMarkerRef = useRef(null);
    const apiKey = 'jAmUDyXs3mjqH_LzVckB8TSEaRg-MxkcpDdgN_EHFws';

    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = () => {
                    console.error(`Error loading script: ${src}`);
                    reject();
                };
                document.head.appendChild(script);
            });
        };

        const loadHereMaps = async () => {
            try {
                await loadScript(
                    'https://js.api.here.com/v3/3.1/mapsjs-core.js'
                );
                await loadScript(
                    'https://js.api.here.com/v3/3.1/mapsjs-service.js'
                );
                await loadScript(
                    'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js'
                );
                await loadScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js');
                setMapsLoaded(true);
            } catch (e) {
                console.error('Error loading HERE Maps scripts:', e);
                setError('Failed to load HERE Maps scripts.');
            }
        };

        loadHereMaps();
    }, []);

    useEffect(() => {
        if (mapsLoaded && window.H) {
            try {
                const platform = new window.H.service.Platform({
                    apikey: apiKey,
                });

                const defaultLayers = platform.createDefaultLayers();

                if (!mapRef.current) {
                    const map = new window.H.Map(
                        document.getElementById('mapContainer'),
                        defaultLayers.vector.normal.map,
                        {
                            center: BUS_STOPS.exterior,
                            zoom: 15,
                            pixelRatio: window.devicePixelRatio || 1,
                        }
                    );

                    mapRef.current = map;

                    window.addEventListener('resize', () =>
                        map.getViewPort().resize()
                    );

                    const behavior = new window.H.mapevents.Behavior(
                        new window.H.mapevents.MapEvents(map)
                    );

                    const ui = window.H.ui.UI.createDefault(map, defaultLayers);
                    ui.getControl('zoom').setVisibility(false);
                    ui.getControl('scalebar').setVisibility(false);
                    ui.getControl('mapsettings').setVisibility(false);

                    const markerExterior = new window.H.map.Marker(
                        BUS_STOPS.exterior,
                        {
                            icon: new window.H.map.Icon(
                                '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="blue" /></svg>'
                            ),
                        }
                    );
                    map.addObject(markerExterior);

                    const markerInterior = new window.H.map.Marker(
                        BUS_STOPS.interior,
                        {
                            icon: new window.H.map.Icon(
                                '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="red" /></svg>'
                            ),
                        }
                    );
                    map.addObject(markerInterior);

                    const busMarker = new window.H.map.Marker(
                        BUS_STOPS.exterior
                    );
                    map.addObject(busMarker);
                    busMarkerRef.current = busMarker;

                    const lineString = new window.H.geo.LineString();
                    ROAD_POINTS.forEach((point) => {
                        lineString.pushPoint(point);
                    });

                    const polyline = new window.H.map.Polyline(lineString, {
                        style: {
                            lineWidth: 6,
                            strokeColor: 'rgba(0, 128, 255, 0.7)',
                        },
                    });
                    map.addObject(polyline);

                    // Enhanced animation with pauses
                    const moveBus = () => {
                        const totalPoints = ROAD_POINTS.length;
                        let currentIndex = 0;
                        let direction = 1;
                        let startTime = null;
                        let isPausing = false;
                        const segmentDuration = 8000; // Speed control
                        const pauseDuration = 10000; // 8 seconds of pause

                        const animate = (timestamp) => {
                            if (isPausing) return;

                            if (!startTime) startTime = timestamp;

                            const elapsed = timestamp - startTime;
                            const progress = Math.min(
                                elapsed / segmentDuration,
                                1
                            );

                            const nextIndex = currentIndex + direction;
                            const currentPoint = ROAD_POINTS[currentIndex];
                            const nextPoint = ROAD_POINTS[nextIndex];

                            // Updates the bus position
                            const newPos = {
                                lat:
                                    currentPoint.lat +
                                    (nextPoint.lat - currentPoint.lat) *
                                        progress,
                                lng:
                                    currentPoint.lng +
                                    (nextPoint.lng - currentPoint.lng) *
                                        progress,
                            };
                            busMarkerRef.current.setGeometry(newPos);

                            if (progress >= 1) {
                                currentIndex += direction;
                                startTime = null;

                                // Verifies if the bus has reached the last point
                                if (
                                    currentIndex <= 0 ||
                                    currentIndex >= totalPoints - 1
                                ) {
                                    isPausing = true;
                                    setTimeout(() => {
                                        isPausing = false;
                                        direction *= -1;
                                        requestAnimationFrame(animate);
                                    }, pauseDuration);
                                } else {
                                    requestAnimationFrame(animate);
                                }
                            } else {
                                requestAnimationFrame(animate);
                            }
                        };

                        requestAnimationFrame(animate);
                    };

                    moveBus(); // Starts animation
                }
            } catch (e) {
                console.error('Error initializing HERE Maps:', e);
                setError('Failed to initialize HERE Maps.');
            }
        }
    }, [mapsLoaded, apiKey]);

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 60px)' }}>
            <div
                id="mapContainer"
                style={{ width: '100%', height: '100%', position: 'relative' }}
            ></div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
>>>>>>> e8c564d70bfb5c52f26a8352a5028da29359ef30
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