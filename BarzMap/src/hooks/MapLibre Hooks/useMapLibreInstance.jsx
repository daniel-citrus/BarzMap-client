import { useEffect, useRef, useState } from 'react';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const DEFAULT_ZOOM = 8;
const DEFAULT_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

/**
 * Initializes a single MapLibre map and exposes the container + instance refs
 * so other hooks can render layers, overlays, and markers against it.
 * @returns {{
 *   mapContainerRef: import('react').MutableRefObject<HTMLDivElement | null>,
 *   mapInstance: import('react').MutableRefObject<maplibregl.Map | null>
 * }}
 */
const useMapLibreInstance = () => {
    const mapContainerRef = useRef(null);
    const mapInstance = useRef(null);
    const [mapReady, setMapReady] = useState(false);

    /* Initialize the map */
    useEffect(() => {
        if (!mapContainerRef.current) {
            return undefined;
        }

        const instance = new maplibregl.Map({
            /* center: [-100.492503, 39.80491], */
            center: [-122.4194, 37.7749],
            container: mapContainerRef.current,
            style: DEFAULT_STYLE_URL,
            zoom: DEFAULT_ZOOM,
            attributionControl: false,
        });

        instance.on('load', () => {
            setMapReady(true);
        });

        instance.addControl(new AttributionControl({ compact: true }));
        mapInstance.current = instance;

        return () => {
            instance.remove();
            mapInstance.current = null;
        };
    }, []);

    return { mapContainerRef, mapInstance, mapReady };
};

export default useMapLibreInstance;
