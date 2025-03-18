import React, { useState, useEffect, useRef } from 'react';

const PARADAS = {
    exterior: { lat: 28.196, lng: -14.119056 },
    interior: { lat: 28.193528, lng: -14.116056 },
};

// Define puntos intermedios que representen la carretera
const ROAD_POINTS = [
    { lat: 28.195838, lng: -14.11906 },
    { lat: 28.196, lng: -14.118 },
    { lat: 28.25, lng: -14.121 },
    { lat: 28.45, lng: -14.121 },
    { lat: 28.65, lng: -14.121 },
    { lat: 28.85, lng: -14.121 },
    { lat: 28.193528, lng: -14.116056 },
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
                            center: PARADAS.exterior,
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
                        PARADAS.exterior,
                        {
                            icon: new window.H.map.Icon(
                                '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="blue" /></svg>'
                            ),
                        }
                    );
                    map.addObject(markerExterior);

                    const markerInterior = new window.H.map.Marker(
                        PARADAS.interior,
                        {
                            icon: new window.H.map.Icon(
                                '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="red" /></svg>'
                            ),
                        }
                    );
                    map.addObject(markerInterior);

                    const busMarker = new window.H.map.Marker(PARADAS.exterior);
                    map.addObject(busMarker);
                    busMarkerRef.current = busMarker;

                    // Función para calcular la ruta y añadirla al mapa
                    const calculateRouteFromAtoB = () => {
                        const router = platform.getRoutingService();

                        const routeRequestParams = {
                            routingMode: 'fast',
                            transportMode: 'car',
                            origin: `${PARADAS.exterior.lat},${PARADAS.exterior.lng}`,
                            destination: `${PARADAS.interior.lat},${PARADAS.interior.lng}`,
                            return: 'polyline,turnByTurnActions,actions,instructions,travelSummary',
                        };

                        router.calculateRoute(
                            routeRequestParams,
                            (result) => onResult(result, map),
                            (error) => {
                                console.error(
                                    'Error calculating route:',
                                    error
                                );
                                setError('Failed to calculate route.');
                            }
                        );
                    };

                    // Función para manejar el resultado del cálculo de la ruta
                    const onResult = (result, map) => {
                        if (result.routes.length) {
                            result.routes.forEach((route) => {
                                addRouteShapeToMap(route, map);
                                addManueversToMap(route, map);
                            });
                        }
                    };

                    // Función para añadir la forma de la ruta al mapa
                    const addRouteShapeToMap = (route, map) => {
                        route.sections.forEach((section) => {
                            let linestring =
                                window.H.geo.LineString.fromFlexiblePolyline(
                                    section.polyline
                                );

                            let polyline = new window.H.map.Polyline(
                                linestring,
                                {
                                    style: {
                                        lineWidth: 4,
                                        strokeColor: 'rgba(0, 128, 255, 0.7)',
                                    },
                                }
                            );

                            map.addObject(polyline);
                            map.getViewModel().setLookAtData({
                                bounds: polyline.getBoundingBox(),
                            });
                        });
                    };

                    // Función para añadir las maniobras al mapa
                    const addManueversToMap = (route, map) => {
                        route.sections.forEach((section) => {
                            let poly =
                                window.H.geo.LineString.fromFlexiblePolyline(
                                    section.polyline
                                ).getLatLngAltArray();

                            section.actions.forEach((action, idx) => {
                                const icon = new window.H.map.Icon(
                                    '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="white" stroke="blue" stroke-width="2" /></svg>',
                                    {
                                        anchor: { x: 12, y: 12 },
                                    }
                                );

                                const marker = new window.H.map.Marker(
                                    {
                                        lat: poly[action.offset * 3],
                                        lng: poly[action.offset * 3 + 1],
                                    },
                                    { icon: icon }
                                );

                                map.addObject(marker);
                            });
                        });
                    };

                    // Llamar a la función para calcular la ruta
                    calculateRouteFromAtoB();

                    // Simulación de movimiento siguiendo la carretera
                    const moveBus = () => {
                        const duration = 10000; // 10 seconds
                        const steps = ROAD_POINTS.length - 1;
                        const interval = duration / steps;
                        let step = 0;

                        const animate = () => {
                            if (step < steps) {
                                const start = ROAD_POINTS[step];
                                const end = ROAD_POINTS[step + 1];
                                const progress =
                                    (Date.now() % interval) / interval;
                                const newPos = {
                                    lat:
                                        start.lat +
                                        (end.lat - start.lat) * progress,
                                    lng:
                                        start.lng +
                                        (end.lng - start.lng) * progress,
                                };
                                busMarker.setGeometry(newPos);
                                if (progress >= 1) {
                                    step++;
                                }
                                requestAnimationFrame(animate);
                            } else {
                                step = 0;
                                requestAnimationFrame(animate);
                            }
                        };

                        animate();
                    };

                    moveBus();
                    setInterval(moveBus, 20000); // Move every 20 seconds
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
}

export default MapComponent;
