import { useEffect, useRef } from 'react';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import useMapHelpers from './useMapHelpers';
import useMapMarkers from './useMapMarkers';

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
    const { getFeaturesWithinBounds } = useMapHelpers();

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

        instance.addControl(new AttributionControl({ compact: true }));
        mapInstance.current = instance;

        return () => {
            instance.remove();
            mapInstance.current = null;
        };
    }, []);

    useEffect(() => {
        const map = mapInstance.current;

        if (!map) {
            return undefined;
        }

        let timeoutId = null;

        const handleMoveEnd = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                const boundaries = mapInstance.current.getBounds();
                const [northEast, southWest] = [boundaries._ne, boundaries._sw];
                const features = getFeaturesWithinBounds(northEast, southWest);
                
            }, 1000);
        };

        map.on('moveend', handleMoveEnd);

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            map.off('moveend', handleMoveEnd);
        };
    }, [mapInstance]);

    return { mapContainerRef, mapInstance };
};

export default useMapLibreInstance;
