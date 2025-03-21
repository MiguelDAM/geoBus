import React, { useState, useEffect, useRef } from 'react';

function MapComponent() {
    const [mapsLoaded, setMapsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);
    const busMarkerRef = useRef(null);
    const apiKey = 'jAmUDyXs3mjqH_LzVckB8TSEaRg-MxkcpDdgN_EHFws';
    const startCoordinates = { lat: 28.195838, lng: -14.11906 };
    const middleCoordinatesOptions = [
        { lat: 28.059343, lng: -14.35454 },
        { lat: 28.160989, lng: -14.230386 },
        { lat: 28.185599, lng: -14.152086 },
        { lat: 28.21672, lng: -14.019853 },
    ];
    const endCoordinates = { lat: 28.195966, lng: -14.119053 };
    const [routePoints, setRoutePoints] = useState([]);
    const [currentMiddleCoordinateIndex, setCurrentMiddleCoordinateIndex] =
        useState(0);

    useEffect(() => {
        // Get a random index on initial load
        setCurrentMiddleCoordinateIndex(
            Math.floor(Math.random() * middleCoordinatesOptions.length)
        );
    }, []);

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

                const map = new window.H.Map(
                    document.getElementById('mapContainer'),
                    defaultLayers.vector.normal.map,
                    {
                        center: startCoordinates,
                        zoom: 15,
                        pixelRatio: window.devicePixelRatio || 1,
                    }
                );

                mapRef.current = map;

                window.addEventListener('resize', () =>
                    map.getViewPort().resize()
                );

                new window.H.mapevents.Behavior(
                    new window.H.mapevents.MapEvents(map)
                );

                const ui = window.H.ui.UI.createDefault(map, defaultLayers);
                ui.getControl('zoom').setVisibility(false);
                ui.getControl('scalebar').setVisibility(false);
                ui.getControl('mapsettings').setVisibility(false);

                // Add start marker
                const startMarker = new window.H.map.Marker(startCoordinates, {
                    icon: new window.H.map.Icon(
                        '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="green" /></svg>'
                    ),
                });
                map.addObject(startMarker);

                // Add middle marker
                const currentMiddleCoordinate =
                    middleCoordinatesOptions[currentMiddleCoordinateIndex];
                const middleMarker = new window.H.map.Marker(
                    currentMiddleCoordinate,
                    {
                        icon: new window.H.map.Icon(
                            '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="yellow" /></svg>'
                        ),
                    }
                );
                map.addObject(middleMarker);

                // Add end marker
                const endMarker = new window.H.map.Marker(endCoordinates, {
                    icon: new window.H.map.Icon(
                        '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="red" /></svg>'
                    ),
                });
                map.addObject(endMarker);

                const busMarker = new window.H.map.Marker(startCoordinates);
                map.addObject(busMarker);
                busMarkerRef.current = busMarker;

                const routingService = platform.getRoutingService(null, 8);

                // Function to calculate route between two points
                const calculateRoute = (start, end) => {
                    return new Promise((resolve, reject) => {
                        const routingParameters = {
                            transportMode: 'car',
                            origin: `${start.lat},${start.lng}`,
                            destination: `${end.lat},${end.lng}`,
                            return: 'polyline',
                        };

                        routingService.calculateRoute(
                            routingParameters,
                            (result) => {
                                if (result.routes && result.routes.length > 0) {
                                    const polylineString =
                                        result.routes[0].sections[0].polyline;
                                    const lineString =
                                        window.H.geo.LineString.fromFlexiblePolyline(
                                            polylineString
                                        );
                                    const points =
                                        lineString.getLatLngAltArray();
                                    const extractedPoints = [];
                                    for (let i = 0; i < points.length; i += 3) {
                                        extractedPoints.push({
                                            lat: points[i],
                                            lng: points[i + 1],
                                        });
                                    }
                                    resolve(extractedPoints);
                                } else {
                                    reject('No se encontraron rutas.');
                                }
                            },
                            (error) => {
                                console.error(
                                    'Error al calcular la ruta:',
                                    error
                                );
                                reject(error);
                            }
                        );
                    });
                };

                // Calculate routes sequentially
                const calculateAllRoutes = async () => {
                    try {
                        const currentMiddleCoordinate =
                            middleCoordinatesOptions[
                                currentMiddleCoordinateIndex
                            ];
                        const route1 = await calculateRoute(
                            startCoordinates,
                            currentMiddleCoordinate
                        );
                        const route2 = await calculateRoute(
                            currentMiddleCoordinate,
                            endCoordinates
                        );
                        const allPoints = [...route1, ...route2];
                        setRoutePoints(allPoints);

                        // Create a LineString and add all the points to it
                        const lineString = new window.H.geo.LineString();
                        allPoints.forEach((point) => {
                            lineString.pushPoint(point);
                        });

                        // Create the Polyline
                        const polyline = new window.H.map.Polyline(lineString, {
                            style: {
                                lineWidth: 6,
                                strokeColor: 'rgba(0, 128, 255, 0.7)',
                            },
                        });
                        map.addObject(polyline);

                        map.getViewModel().setLookAtData({
                            bounds: polyline.getBoundingBox(),
                        });
                    } catch (e) {
                        console.error('Error al calcular todas las rutas:', e);
                        setError('Error al calcular todas las rutas.');
                    }
                };

                calculateAllRoutes();

                // Clean up previous objects before re-rendering
                return () => {
                    map.removeObjects(map.getObjects());
                };
            } catch (e) {
                console.error('Error initializing HERE Maps:', e);
                setError('Failed to initialize HERE Maps.');
            }
        }
    }, [mapsLoaded, currentMiddleCoordinateIndex]);

    useEffect(() => {
        if (mapsLoaded && routePoints.length > 0 && busMarkerRef.current) {
            // Enhanced animation with pauses
            const moveBus = () => {
                const totalPoints = routePoints.length;
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
                    const progress = Math.min(elapsed / segmentDuration, 1);

                    const nextIndex = currentIndex + direction;
                    const currentPoint = routePoints[currentIndex];
                    const nextPoint = routePoints[nextIndex];

                    const newPos = {
                        lat:
                            currentPoint.lat +
                            (nextPoint.lat - currentPoint.lat) * progress,
                        lng:
                            currentPoint.lng +
                            (nextPoint.lng - currentPoint.lng) * progress,
                    };
                    busMarkerRef.current.setGeometry(newPos);

                    if (progress >= 1) {
                        currentIndex += direction;
                        startTime = null;

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

            moveBus();
        }
    }, [mapsLoaded, routePoints]);

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 154.33px)' }}>
            <div
                id="mapContainer"
                style={{ width: '100%', height: '100%', position: 'relative' }}
            ></div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default MapComponent;
