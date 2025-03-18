import React, { useState, useEffect, useCallback, useRef } from 'react';

const PARADAS = {
    exterior: { lat: 28.196, lng: -14.119056 },
    interior: { lat: 28.193528, lng: -14.116056 },
};

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

                    const router = platform.getRoutingService();

                    const routeRequestParams = {
                        mode: 'fastest;car',
                        representation: 'display',
                        waypoint0: `geo!${PARADAS.exterior.lat},${PARADAS.exterior.lng}`,
                        waypoint1: `geo!${PARADAS.interior.lat},${PARADAS.interior.lng}`,
                        routeattributes: 'waypoints,summary,shape,legs',
                    };

                    router.calculateRoute(
                        routeRequestParams,
                        (result) => {
                            if (result.response.route) {
                                const route = result.response.route[0];
                                const routeShape = route.shape.map((point) => {
                                    const parts = point.split(',');
                                    return {
                                        lat: parseFloat(parts[0]),
                                        lng: parseFloat(parts[1]),
                                    };
                                });

                                const lineString =
                                    new window.H.geo.LineString();
                                routeShape.forEach((point) => {
                                    lineString.pushPoint(point);
                                });

                                const polyline = new window.H.map.Polyline(
                                    lineString,
                                    {
                                        style: {
                                            lineWidth: 4,
                                            strokeColor:
                                                'rgba(0, 128, 255, 0.7)',
                                        },
                                    }
                                );
                                map.addObject(polyline);

                                const moveBus = () => {
                                    const duration = 10000; // 10 seconds
                                    const steps = 100;
                                    const interval = duration / steps;
                                    let step = 0;

                                    const animate = () => {
                                        if (step <= steps) {
                                            const progress = step / steps;
                                            const index = Math.floor(
                                                progress *
                                                    (routeShape.length - 1)
                                            );
                                            const point = routeShape[index];
                                            busMarker.setGeometry(point);
                                            step++;
                                            requestAnimationFrame(animate);
                                        }
                                    };

                                    animate();
                                };

                                moveBus();
                                setInterval(moveBus, 20000); // Move every 20 seconds
                            }
                        },
                        (error) => {
                            console.error('Error calculating route:', error);
                            setError('Failed to calculate route.');
                        }
                    );
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
                style={{ width: '100%', height: '100%' }}
            ></div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default MapComponent;
