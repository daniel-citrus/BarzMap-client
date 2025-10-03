import { useEffect, useState } from 'react';
import { config, geocoding } from '@maptiler/client';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_CLOUD_API;
config.apiKey = MAPTILER_API_KEY;

// Convert coordinates to a physical address
const getAddress = async (longitude, latitude) => {
    const payload = await geocoding.reverse([longitude, latitude]);
    const primaryFeature = payload?.features?.[0];

    if (!primaryFeature) {
        return '';
    }

    return primaryFeature.place_name;
};

const getCoordinates = async (address) => {
    const result = await geocoding.forward(address);
    const center = result?.features?.[0].center;
    const [longitude, latitude] = center;
    return { longitude, latitude };
};

/**
 * Resolves a client's street address and coordinates via MapTiler geocoding,
 * caching the address in localStorage and exposing helpers to refresh or
 * override the location from UI interactions.
 *
 * @returns {{
 *   address: string,
 *   setAddress: import('react').Dispatch<import('react').SetStateAction<string>>,
 *   coordinates: { longitude: number, latitude: number } | null,
 *   setCoordinates: import('react').Dispatch<import('react').SetStateAction<{ longitude: number, latitude: number } | null>>,
 * }}
 */
const useClientAddress = () => {
    const [address, setAddress] = useState('Lakeshore Park, Oakland CA');
    const [coordinates, setCoordinates] = useState(null);

    /**
     * Requests browser geolocation permission, persists the reverse-geocoded
     * address, and updates local state values that the hook exposes.
     *
     * @returns {Promise<void>}
     */
    const resolveAddress = async () => {
        if (!MAPTILER_API_KEY) {
            console.warn(
                'Missing MapTiler API key; unable to request address.'
            );
            return;
        }

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

            setAddress(newAddress);
        } catch (error) {
            console.error('Unable to determine user address:', error);
        }
    };

    /* Recalculate coordinates when new address is set */
    useEffect(() => {
        /* Initial page load browser geolocation request */
        if (!address || address.trim() === '') {
            resolveAddress();
            return;
        }
        
        const updateCoords = async () => {
            try {
                const newCoords = await getCoordinates(address);
                
                setCoordinates(newCoords);
            } catch (e) {
                console.error('Unable to resolve coordinates from address:', e);
            }
        };
        
        updateCoords();
    }, [address]);

    return { address, setAddress, coordinates, setCoordinates };
};

export default useClientAddress;
