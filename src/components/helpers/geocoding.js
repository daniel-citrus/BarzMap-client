import { config, geocoding } from '@maptiler/client';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_CLOUD_API;
config.apiKey = MAPTILER_API_KEY;

// Convert coordinates to a physical address
const getAddress = async (longitude, latitude) => {
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

const getCoordinates = async (address) => {
    if (!MAPTILER_API_KEY) {
        console.warn('Missing MapTiler API key; unable to request address.');
        return;
    }

    const result = await geocoding.forward(address);
    const center = result?.features?.[0].center;
    const [longitude, latitude] = center;
    return { longitude, latitude };
};

/**
 * Requests browser geolocation permission, persists the reverse-geocoded
 * address, and updates local state values that the hook exposes.
 *
 * @returns {Promise<void>}
 */
const resolveAddress = async () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
        console.error('Geolocation not supported in this environment.');
        return;
    }

    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10_000,
                maximumAge: 0,
            });
        });

        const { longitude, latitude } = position.coords;
        const newAddress = await getAddress(longitude, latitude);
        const currentAddress = window.localStorage.getItem('storedAddress');

        if (currentAddress !== newAddress) {
            window.localStorage.setItem('storedAddress', newAddress);
        }

        return newAddress;
    } catch (error) {
        console.error('Unable to determine user address:', error);
    }
};

export { getAddress, getCoordinates, resolveAddress };
