import { useEffect, useRef } from 'react';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import useSampleParkData from '../hooks/useSampleParkData';

const DEFAULT_CENTER = [-122.4194, 37.7749];
const DEFAULT_ZOOM = 10;
const DEFAULT_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

const MapLibreMap = () => {
    const { parks } = useSampleParkData();
    const containerRef = useRef(null);
    const markersRef = useRef([]);

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        const mapInstance = new maplibregl.Map({
            container: containerRef.current,
            style: DEFAULT_STYLE_URL,
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            attributionControl: false,
        });

        mapInstance.addControl(new AttributionControl({ compact: true }));

        markersRef.current = parks.features.map((feature) => {
            const [longitude, latitude] = feature.geometry.coordinates;

            return new maplibregl.Marker()
                .setLngLat([longitude, latitude])
                .setPopup(new maplibregl.Popup().setText(feature.properties.name))
                .addTo(mapInstance);
        });

        return () => {
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];
            mapInstance.remove();
        };
    }, [parks]);

    return <div ref={containerRef} className='h-full w-full' />;
};

export default MapLibreMap;
