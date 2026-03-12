import { useEffect, useRef, useState } from 'react';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { MapLibreInstanceValue } from '../../types/mapLibre';

const DEFAULT_ZOOM = 8;
const DEFAULT_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

/** Initializes a MapLibre map; exposes container + instance refs for layers/overlays/markers. */
const useMapLibreInstance = (): MapLibreInstanceValue => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const instance = new maplibregl.Map({
            center: [-122.4194, 37.7749],
            container: mapContainerRef.current,
            style: DEFAULT_STYLE_URL,
            zoom: DEFAULT_ZOOM,
            attributionControl: false,
        });

        const geolocateControl = new maplibregl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
        });

        instance.addControl(new AttributionControl({ compact: true }));
        instance.addControl(new maplibregl.NavigationControl({ showZoom: false }), 'bottom-right');
        instance.addControl(geolocateControl, 'bottom-right');

        instance.on('load', () => {
            geolocateControl.trigger();
            setMapReady(true);
        });
        mapInstance.current = instance;

        return () => {
            instance.remove();
            mapInstance.current = null;
        };
    }, []);

    return { mapContainerRef, mapInstance, mapReady };
};

export default useMapLibreInstance;
