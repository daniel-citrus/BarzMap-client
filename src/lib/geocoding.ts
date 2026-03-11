import { config, geocoding } from '@maptiler/client';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_CLOUD_API as string | undefined;
if (MAPTILER_API_KEY) {
    config.apiKey = MAPTILER_API_KEY;
}

export interface Coordinates {
    longitude: number;
    latitude: number;
}

/**
 * Reverse-geocodes a longitude/latitude pair into a human-readable address
 * using MapTiler's geocoding API.
 *
 * @param longitude
 * @param latitude
 * @returns formatted address or undefined when unavailable
 */
const getAddress = async (
    longitude: number,
    latitude: number
): Promise<string | undefined> => {
    if (!MAPTILER_API_KEY) {
        console.warn('Missing MapTiler API key; unable to request address.');
        return;
    }

    const payload = await geocoding.reverse([longitude, latitude]);
    const primaryFeature = payload?.features?.[0];

    if (!primaryFeature) {
        return '';
    }

    return primaryFeature.place_name;
};

/**
 * Forward-geocodes a textual address into longitude/latitude coordinates via
 * MapTiler's geocoding API.
 *
 * @param address
 * @returns resolved coordinates or undefined when unavailable
 */
const getCoordinates = async (
    address: string
): Promise<Coordinates | undefined> => {
    if (!MAPTILER_API_KEY) {
        console.warn('Missing MapTiler API key; unable to request address.');
        return;
    }

    const result = await geocoding.forward(address);
    const feature = result?.features?.[0];
    const center = feature?.center;

    if (!center || center.length < 2) {
        return;
    }

    const [longitude, latitude] = center;
    return { longitude, latitude };
};

/**
 * Requests browser geolocation, reverse-geocodes the coordinates, and caches
 * the resulting address in localStorage.
 *
 * @returns resolved address or undefined on failure
 */
const resolveAddress = async (): Promise<string | undefined> => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
        console.error('Geolocation not supported in this environment.');
        return;
    }

    try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10_000,
                maximumAge: 0,
            });
        });

        const { longitude, latitude } = position.coords;
        const newAddress = await getAddress(longitude, latitude);
        const currentAddress = window.localStorage.getItem('storedAddress');

        if (newAddress != null && currentAddress !== newAddress) {
            window.localStorage.setItem('storedAddress', newAddress);
        }

        return newAddress;
    } catch (error) {
        console.error('Unable to determine user address:', error);
    }
};

export { getAddress, getCoordinates, resolveAddress };
