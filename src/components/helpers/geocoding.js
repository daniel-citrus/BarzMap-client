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

export { getAddress, getCoordinates };
