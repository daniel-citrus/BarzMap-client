import { useEffect, useRef } from 'react';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const DEFAULT_COORDINATES = { lat: 37.7749, lng: -122.4194 };
const DEFAULT_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

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
    mapStyle,
    mapStyleUrl = DEFAULT_STYLE_URL,
    options = {},
    className,
    style,
}) => {
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const styleRef = useRef(null);
    const {
        style: optionsStyle,
        center: optionsCenter,
        zoom: optionsZoom,
        bearing: optionsBearing,
        pitch: optionsPitch,
        ...restOptions
    } = options;

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        const resolvedStyle = optionsStyle ?? mapStyle ?? mapStyleUrl;

        const mapInstance = new maplibregl.Map({
            container: containerRef.current,
            style: resolvedStyle,
            center: toLngLatTuple(optionsCenter ?? center),
            zoom: optionsZoom ?? zoom,
            bearing: optionsBearing ?? bearing,
            pitch: optionsPitch ?? pitch,
            attributionControl: false,
            ...restOptions,
        }).addControl(
            new AttributionControl({
                compact: true,
                customAttribution: `<a href='https://www.maptiler.com/copyright/' target='_blank'>
                    &copy; MapTiler
                </a>`,
            })
        );

        mapRef.current = mapInstance;
        styleRef.current = resolvedStyle;

        return () => {
            mapInstance.remove();
            mapRef.current = null;
            styleRef.current = null;
        };
    }, []);

    useEffect(() => {
        const mapInstance = mapRef.current;
        if (!mapInstance) {
            return;
        }

        const resolvedStyle = optionsStyle ?? mapStyle ?? mapStyleUrl;

        if (styleRef.current === resolvedStyle) {
            return;
        }

        styleRef.current = resolvedStyle;
        mapInstance.setStyle(resolvedStyle);
    }, [optionsStyle, mapStyle, mapStyleUrl]);

    useEffect(() => {
        const mapInstance = mapRef.current;
        if (!mapInstance) {
            return;
        }

        const [nextLng, nextLat] = toLngLatTuple(optionsCenter ?? center);
        const currentCenter = mapInstance.getCenter();

        if (currentCenter.lng !== nextLng || currentCenter.lat !== nextLat) {
            mapInstance.setCenter([nextLng, nextLat]);
        }
    }, [center, optionsCenter]);

    useEffect(() => {
        const mapInstance = mapRef.current;
        const targetZoom = optionsZoom ?? zoom;

        if (!mapInstance || typeof targetZoom !== 'number') {
            return;
        }

        if (mapInstance.getZoom() !== targetZoom) {
            mapInstance.setZoom(targetZoom);
        }
    }, [zoom, optionsZoom]);

    useEffect(() => {
        const mapInstance = mapRef.current;
        const targetBearing = optionsBearing ?? bearing;

        if (!mapInstance || typeof targetBearing !== 'number') {
            return;
        }

        if (mapInstance.getBearing() !== targetBearing) {
            mapInstance.setBearing(targetBearing);
        }
    }, [bearing, optionsBearing]);

    useEffect(() => {
        const mapInstance = mapRef.current;
        const targetPitch = optionsPitch ?? pitch;

        if (!mapInstance || typeof targetPitch !== 'number') {
            return;
        }

        if (mapInstance.getPitch() !== targetPitch) {
            mapInstance.setPitch(targetPitch);
        }
    }, [pitch, optionsPitch]);

    const combinedClassName = [className, 'h-full w-full'].filter(Boolean).join(' ');

    return (
        <div
            ref={containerRef}
            className={combinedClassName}
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
