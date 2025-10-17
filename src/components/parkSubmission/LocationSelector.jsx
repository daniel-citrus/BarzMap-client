import { useEffect, useRef, useState } from 'react';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const DEFAULT_ZOOM = 13;
const DEFAULT_STYLE_URL = import.meta.env.VITE_MAPLIBRE_DEFAULT_STYLE;
const DEFAULT_COORDINATES = { lat: 37.7749, lng: -122.4194 };

const LocationSelector = ({
    initialCoords = DEFAULT_COORDINATES,
    onLocationChange,
}) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [coordinates, setCoordinates] = useState({
        lat: 37.7749,
        lng: -122.4194,
    });

    useEffect(() => {
        const container = mapContainerRef.current;
        if (!container) {
            return undefined;
        }

        const map = new maplibregl.Map({
            container,
            center: [initialCoords.lng, initialCoords.lat],
            zoom: DEFAULT_ZOOM,
            style: DEFAULT_STYLE_URL,
            attributionControl: false,
        });

        map.addControl(new AttributionControl({ compact: true }));

        const marker = new maplibregl.Marker({ draggable: true })
            .setLngLat([initialCoords.lng, initialCoords.lat])
            .addTo(map);

        /* Map interactions */
        marker.on('dragend', () => {
            const lngLat = marker.getLngLat();

            onLocationChange?.({ lat: lngLat.lat, lng: lngLat.lng });
            setCoordinates({
                lat: lngLat.lat,
                lng: lngLat.lng,
            });
        });

        map.on('click', (event) => {
            marker.setLngLat(event.lngLat);
            setCoordinates({
                lng: event.lngLat.lng,
                lat: event.lngLat.lat,
            });

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
    }, [initialCoords, onLocationChange]);

    useEffect(() => {
        if (!mapRef.current || !markerRef.current) {
            return;
        }

        markerRef.current.setLngLat([coordinates.lng, coordinates.lat]);
        /* mapRef.current.setCenter([coordinates.lng, coordinates.lat]); */
    }, [coordinates]);

    const onChangeLng = (e) => {
        const newLng = e.target.value;

        setCoordinates({
            ...coordinates,
            lng: newLng,
        });
    };

    const onChangeLat = (e) => {
        const newLat = e.target.value;

        setCoordinates({
            ...coordinates,
            lat: newLat,
        });
    };

    const centerMapOnCoordinates = () => {
        if (!mapRef.current) {
            return;
        }

        if (coordinates.lng === '' || coordinates.lat === '') {
            return;
        }

        const lng = Number(coordinates.lng);
        const lat = Number(coordinates.lat);
        if (Number.isNaN(lng) || Number.isNaN(lat)) {
            return;
        }

        mapRef.current.easeTo({
            center: [lng, lat],
            zoom: DEFAULT_ZOOM + 2,
            bearing: 0,
            pitch: 0,
        });
        markerRef.current?.setLngLat([lng, lat]);
    };

    return (
        <section className='space-y-4'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                Location
            </h2>
            <label className='grid gap-2'>
                <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                    Address <span className='text-rose-500'>*</span>
                </span>
                <input
                    type='text'
                    name='address'
                    placeholder='123 Park Ave, Springfield, CA 94110'
                    className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                    required
                />
            </label>

            <div className='space-y-3'>
                <div className='grid gap-3 sm:grid-cols-2'>
                    <label className='grid gap-2'>
                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                            Longitude
                        </span>
                        <input
                            type='text'
                            name='coordLng'
                            id='coordLng'
                            placeholder='Longitude'
                            className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                            onChange={onChangeLng}
                            value={coordinates.lng}
                        />
                    </label>
                    <label className='grid gap-2'>
                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                            Latitude
                        </span>
                        <input
                            type='text'
                            name='coordLat'
                            id='coordLat'
                            placeholder='Latitude'
                            className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                            onChange={onChangeLat}
                            value={coordinates.lat}
                        />
                    </label>
                </div>
                <div className='flex items-center justify-between'>
                    <h3 className='text-sm font-semibold text-slate-700'>
                        Pin the park location
                    </h3>
                    <p className='text-xs text-slate-400'>
                        Drag marker, tap on the map, or update the coordinates
                    </p>
                </div>
                <div className='relative'>
                    <div
                        ref={mapContainerRef}
                        className='h-100 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-inner shadow-slate-200'
                    />
                    <button
                        type='button'
                        onClick={centerMapOnCoordinates}
                        className='absolute right-4 top-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-indigo-600 shadow-lg shadow-slate-900/10 backdrop-blur-sm transition hover:bg-white'
                    >
                        Recenter
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LocationSelector;
