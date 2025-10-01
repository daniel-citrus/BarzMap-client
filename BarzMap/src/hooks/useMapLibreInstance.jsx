import { useEffect, useRef } from 'react';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const DEFAULT_ZOOM = 5;
const DEFAULT_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

/** Generates a single MapLibre map instance and provides mapInstance state to allow other hook to interact with the map. */
const useMapLibreInstance = () => {
    const mapContainerRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        if (!mapContainerRef.current) {
            return undefined;
        }

        const instance = new maplibregl.Map({
            center: [-100.492503, 39.80491],
            container: mapContainerRef.current,
            style: DEFAULT_STYLE_URL,
            zoom: DEFAULT_ZOOM,
            attributionControl: false,
        });

        instance.addControl(new AttributionControl({ compact: true }));
        mapInstance.current = instance;

        return () => {
            instance.remove();
            mapInstance.current = null;
        };
    }, []);

    return { mapContainerRef, mapInstance };
};

export default useMapLibreInstance;
