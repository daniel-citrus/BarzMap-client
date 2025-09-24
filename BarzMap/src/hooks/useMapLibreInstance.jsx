import { useEffect, useRef, useState } from 'react';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const DEFAULT_CENTER = [-122.4194, 37.7749];
const DEFAULT_ZOOM = 10;
const DEFAULT_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

// Generates one MapLibre map instance
const useMapLibreInstance = () => {
    const mapContainerRef = useRef(null);
    const markersRef = useRef([]);
    const [mapInstance, setMapInstance] = useState(null);

    useEffect(() => {
        if (!mapContainerRef.current) {
            return undefined;
        }

        const instance = new maplibregl.Map({
            container: mapContainerRef.current,
            style: DEFAULT_STYLE_URL,
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            attributionControl: false,
        });

        instance.addControl(new AttributionControl({ compact: true }));
        setMapInstance(instance);

        return () => {
            instance.remove();
            setMapInstance(null);
        };
    }, []);

    const setMarkers = (parks /* Use Sample parks as data model */) => {
        markersRef.current = parks.features.map((feature) => {
            const [longitude, latitude] = feature.geometry.coordinates;

            return new maplibregl.Marker()
                .setLngLat([longitude, latitude])
                .setPopup(
                    new maplibregl.Popup().setText(feature.properties.name)
                )
                .addTo(mapInstance);
        });
    };

    return { mapContainerRef, mapInstance, setMarkers };
};

export default useMapLibreInstance;
