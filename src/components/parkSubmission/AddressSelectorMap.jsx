import { useEffect, useRef } from 'react';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const DEFAULT_LOCATION = {
    lat: 37.7749,
    lng: -122.4194,
};

const DEFAULT_ZOOM = 13;
const DEFAULT_STYLE_URL = import.meta.env.VITE_MAPLIBRE_DEFAULT_STYLE;

const AddressSelectorMap = ({
    initialLocation = DEFAULT_LOCATION,
    onLocationChange,
}) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        const container = mapContainerRef.current;
        if (!container) {
            return undefined;
        }

        const map = new maplibregl.Map({
            container,
            center: [initialLocation.lng, initialLocation.lat],
            zoom: DEFAULT_ZOOM,
            style: DEFAULT_STYLE_URL,
            attributionControl: false,
        });

        map.addControl(new AttributionControl({ compact: true }));

        const marker = new maplibregl.Marker({ draggable: true })
            .setLngLat([initialLocation.lng, initialLocation.lat])
            .addTo(map);

        marker.on('dragend', () => {
            const lngLat = marker.getLngLat();
            onLocationChange?.({ lat: lngLat.lat, lng: lngLat.lng });
        });

        map.on('click', (event) => {
            marker.setLngLat(event.lngLat);
            onLocationChange?.({
                lat: event.lngLat.lat,
                lng: event.lngLat.lng,
            });
        });

        mapRef.current = map;
        markerRef.current = marker;

        return () => {
            map.remove();
            markerRef.current = null;
            mapRef.current = null;
        };
    }, [initialLocation, onLocationChange]);

    useEffect(() => {
        if (!mapRef.current || !markerRef.current) {
            return;
        }

        markerRef.current.setLngLat([initialLocation.lng, initialLocation.lat]);
        mapRef.current.setCenter([initialLocation.lng, initialLocation.lat]);
    }, [initialLocation]);

    return (
        <div className='space-y-3'>
            <div className='flex items-center justify-between'>
                <h3 className='text-sm font-semibold text-slate-700'>
                    Pin the park location
                </h3>
                <p className='text-xs text-slate-400'>
                    Drag marker or tap on the map
                </p>
            </div>
            <div
                ref={mapContainerRef}
                className='w-full overflow-hidden rounded-2xl border border-slate-200 shadow-inner shadow-slate-200 h-100'
            />
        </div>
    );
};

export default AddressSelectorMap;
