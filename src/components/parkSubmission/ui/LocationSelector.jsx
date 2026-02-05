import { useEffect, useMemo, useRef, useState } from 'react';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
    getAddress,
    getCoordinates,
    resolveAddress,
} from '../../../lib/geocoding';

const DEFAULT_ZOOM = 13;
const DEFAULT_STYLE_URL = import.meta.env.VITE_MAPLIBRE_DEFAULT_STYLE;
const DEFAULT_COORDINATES = { lat: 37.7749, lng: -122.4194 };

const LocationSelector = ({ initialCoords = DEFAULT_COORDINATES }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const addressInputRef = useRef(null);
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(initialCoords);

    const [addressLoading, setAddressLoading] = useState(false);

    const onFindAddress = async () => {
        const newAddress = addressInputRef.current?.value?.trim();
        if (!newAddress) {
            return;
        }

        setAddressLoading(true);
        try {
            const coords = await getCoordinates(newAddress);
            if (!coords) {
                return;
            }

            const newCoords = {
                lng: coords.longitude,
                lat: coords.latitude,
            };

            setCoordinates({
                lng: newCoords.lng,
                lat: newCoords.lat,
            });
            setAddress(newAddress);
            centerMapOnCoordinates(newCoords.lat, newCoords.lng);
        } finally {
            setAddressLoading(false);
        }
    };

    const onFindCurrentLocation = () => {
        const getUserAddress = async () => {
            const userAddress = await resolveAddress();

            if (addressInputRef.current) {
                addressInputRef.current.value = userAddress;
            }
        };

        getUserAddress();
    };

    /* Initialize map instance */
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
        });

        mapRef.current = map;
        markerRef.current = marker;

        return () => {
            map.remove();
            markerRef.current = null;
            mapRef.current = null;
        };
    }, [initialCoords]);

    const centerMapOnCoordinates = (lat, lng) => {
        if (!mapRef.current) {
            return;
        }

        if (lng === '' || lat === '') {
            return;
        }

        const lngNumber = Number(lng);
        const latNumber = Number(lat);
        if (Number.isNaN(lngNumber) || Number.isNaN(latNumber)) {
            return;
        }

        mapRef?.current.easeTo({
            center: [lngNumber, latNumber],
            zoom: DEFAULT_ZOOM + 2,
            bearing: 0,
            pitch: 0,
        });
        markerRef.current?.setLngLat([lngNumber, latNumber]);
    };

    // Update physical address when coordinates are changed via map marker.
    useEffect(() => {
        const updateAddress = async () => {
            const { lng: longitude, lat: latitude } = coordinates;

            if (!longitude || !latitude) {
                return;
            }

            const newAddress = await getAddress(longitude, latitude);

            setAddress(newAddress);
        };

        updateAddress();
    }, [coordinates]);

    // if address is changed, clear coordinates
    const onTypingAddress = (e) => {
        setAddress(e.target.value);

        setCoordinates({
            lat: '',
            lng: '',
        });
    };

    const addressFieldClasses = useMemo(
        () =>
            `w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-[border-color,box-shadow] duration-200 ${addressLoading
                ? 'border-indigo-200 ring-2 ring-indigo-100 pr-10'
                : 'border-slate-200'
            }`,
        [addressLoading]
    );

    return (
        <section className='space-y-4'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                Location
            </h2>
            <label className='grid gap-2' htmlFor='address'>
                <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                    Address <span className='text-rose-500'>*</span>
                </span>
                <div className='relative flex flex-col gap-2 sm:flex-row sm:items-center'>
                    <div className='relative flex-1'>
                        <input
                            ref={addressInputRef}
                            type='text'
                            name='address'
                            id='address'
                            placeholder='123 Park Ave, Springfield, CA 94110'
                            className={addressFieldClasses}
                            required
                            value={address}
                            onChange={(e) => {
                                onTypingAddress(e);
                            }}
                        />
                        <div className='pointer-events-none absolute inset-y-0 right-3 flex items-center gap-3'>
                            {addressLoading && (
                                <span className='inline-flex items-center'>
                                    <svg
                                        className='h-4 w-4 animate-spin text-indigo-500'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <circle
                                            className='opacity-25'
                                            cx='12'
                                            cy='12'
                                            r='10'
                                            stroke='currentColor'
                                            strokeWidth='4'
                                        />
                                        <path
                                            className='opacity-75'
                                            d='M4 12a 8 8 0 0 1 8-8'
                                            stroke='currentColor'
                                            strokeWidth='4'
                                            strokeLinecap='round'
                                        />
                                    </svg>
                                </span>
                            )}
                            <button
                                type='button'
                                className='pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-indigo-500 transition hover:text-indigo-600 hover:scale-105 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-200 cursor-pointer'
                                aria-label='Use my current location'
                                onClick={onFindCurrentLocation}
                            >
                                <svg
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                >
                                    <circle
                                        cx='12'
                                        cy='12'
                                        r='3'
                                        fill='currentColor'
                                    />
                                    <circle
                                        cx='12'
                                        cy='12'
                                        r='6'
                                        stroke='currentColor'
                                        strokeWidth='1.4'
                                    />
                                    <path
                                        d='M12 4v2m0 12v2m8-8h-2M6 12H4'
                                        stroke='currentColor'
                                        strokeWidth='1.4'
                                        strokeLinecap='round'
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button
                        type='button'
                        className='inline-flex w-full items-center justify-center rounded-lg bg-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm transition hover:bg-slate-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-300 sm:h-[40px] sm:w-auto cursor-pointer'
                        onClick={onFindAddress}
                    >
                        Find
                    </button>
                </div>
            </label>

            <div className='space-y-3'>
                <div className='grid gap-3 sm:grid-cols-2'>
                    <label className='grid gap-2' htmlFor='coordLng'>
                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                            Longitude
                        </span>
                        <input
                            type='text'
                            name='coordLng'
                            id='coordLng'
                            placeholder='Longitude'
                            className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                            value={coordinates.lng}
                        />
                    </label>
                    <label className='grid gap-2' htmlFor='coordLat'>
                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                            Latitude
                        </span>
                        <input
                            type='text'
                            name='coordLat'
                            id='coordLat'
                            placeholder='Latitude'
                            className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                            value={coordinates.lat}
                        />
                    </label>
                </div>
                <div className='flex items-center justify-between'>
                    <h3 className='text-sm font-semibold text-slate-700'>
                        Pin the park location
                    </h3>
                    <p className='text-xs text-slate-400'>
                        Drag marker or tap on the map to update the coordinates
                    </p>
                </div>
                <div className='relative'>
                    <div
                        ref={mapContainerRef}
                        className='h-100 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-inner shadow-slate-200'
                    />
                    <button
                        type='button'
                        onClick={() => {
                            centerMapOnCoordinates(
                                coordinates.lat,
                                coordinates.lng
                            );
                        }}
                        className='absolute right-4 top-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-indigo-600 shadow-lg shadow-slate-900/10 backdrop-blur-sm transition hover:bg-white hover:shadow-xl focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-200 cursor-pointer'
                    >
                        Recenter
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LocationSelector;
