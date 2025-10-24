import { useEffect, useState } from 'react';
import { resolveAddress, getCoordinates } from '../lib/geocoding';

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
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);

    /* Recalculate coordinates when new address is set */
    useEffect(() => {
        const initialPageLoad = async () => {
            if (!address || address.trim() === '') {
                const newAddress = await resolveAddress();
                setAddress(newAddress);
            }
        };

        const updateCoords = async () => {
            try {
                if (!address || address.trim() === '') {
                    return;
                }

                const newCoords = await getCoordinates(address);
                setCoordinates(newCoords);
            } catch (e) {
                console.error('Unable to resolve coordinates from address:', e);
            }
        };

        initialPageLoad();
        updateCoords();
    }, [address]);

    return { address, setAddress, coordinates, setCoordinates };
};

export default useClientAddress;
