import { useCallback, useEffect, useRef, useState } from 'react';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const DEFAULT_ZOOM = 14;
const DEFAULT_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

/** Generates a single MapLibre map instance and provides mapInstance state to allow other hook to interact with the map. */
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
            zoom: DEFAULT_ZOOM,
            attributionControl: false,
        });

        instance.addControl(new AttributionControl({ compact: true }));
        setMapInstance(instance);


        return () => {
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];
            instance.remove();
            setMapInstance(null);
        };
    }, []);

    const setMarkers = useCallback(
        (featureCollection) => {
            if (!mapInstance || !featureCollection?.features) {
                return;
            }

            markersRef.current.forEach((marker) => marker.remove());

            markersRef.current = featureCollection.features.map((feature) => {
                const [longitude, latitude] = feature.geometry.coordinates;

                return new maplibregl.Marker()
                    .setLngLat([longitude, latitude])
                    .setPopup(
                        new maplibregl.Popup().setText(feature.properties.name)
                    )
                    .addTo(mapInstance);
            });
        },
        [mapInstance]
    );

    return { mapContainerRef, mapInstance, setMarkers };
};

export default useMapLibreInstance;
