import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const DEFAULT_COORDINATES = { lat: 37.7749, lng: -122.4194 };
const DEFAULT_STYLE_URL = 'https://demotiles.maplibre.org/style.json';

const toLngLatTuple = (value) => {
    if (Array.isArray(value) && value.length >= 2) {
        return [value[0], value[1]];
    }

    if (value && typeof value === 'object') {
        const longitude = value.lng ?? value.lon ?? value.longitude;
        const latitude = value.lat ?? value.latitude;

        if (typeof longitude === 'number' && typeof latitude === 'number') {
            return [longitude, latitude];
        }
    }

    return [DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.lat];
};

const MapLibreMap = ({
    center = DEFAULT_COORDINATES,
    zoom = 12,
    bearing = 0,
    pitch = 0,
    styleUrl = DEFAULT_STYLE_URL,
    options = {},
    className,
    style,
}) => {
    const containerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        const mapInstance = new maplibregl.Map({
            container: containerRef.current,
            style: options.style ?? styleUrl,
            center: toLngLatTuple(options.center ?? center),
            zoom: options.zoom ?? zoom,
            bearing: options.bearing ?? bearing,
            pitch: options.pitch ?? pitch,
            ...options,
        });

        mapRef.current = mapInstance;

        return () => {
            mapInstance.remove();
            mapRef.current = null;
        };
        // We only want to instantiate the map once.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const mapInstance = mapRef.current;
        if (!mapInstance) {
            return;
        }

        const [nextLng, nextLat] = toLngLatTuple(center);
        const currentCenter = mapInstance.getCenter();

        if (currentCenter.lng !== nextLng || currentCenter.lat !== nextLat) {
            mapInstance.setCenter([nextLng, nextLat]);
        }
    }, [center]);

    useEffect(() => {
        const mapInstance = mapRef.current;
        if (!mapInstance || typeof zoom !== 'number') {
            return;
        }

        if (mapInstance.getZoom() !== zoom) {
            mapInstance.setZoom(zoom);
        }
    }, [zoom]);

    useEffect(() => {
        const mapInstance = mapRef.current;
        if (!mapInstance || typeof bearing !== 'number') {
            return;
        }

        if (mapInstance.getBearing() !== bearing) {
            mapInstance.setBearing(bearing);
        }
    }, [bearing]);

    useEffect(() => {
        const mapInstance = mapRef.current;
        if (!mapInstance || typeof pitch !== 'number') {
            return;
        }

        if (mapInstance.getPitch() !== pitch) {
            mapInstance.setPitch(pitch);
        }
    }, [pitch]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                width: '100%',
                height: '100%',
                minHeight: '320px',
                ...style,
            }}
        />
    );
};

export default MapLibreMap;
