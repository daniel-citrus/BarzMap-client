import { useEffect, useState, useRef } from 'react';
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
    const previousAddressRef = useRef('');

    /* Recalculate coordinates when new address is set */
    useEffect(() => {
        const aborter = new AbortController();
        let isCancelled = false;

        const initialPageLoad = async () => {
            if (!address || address.trim() === '') {
                try {
                    const newAddress = await resolveAddress();
                    if (!isCancelled && newAddress) {
                        setAddress(newAddress);
                    }
                } catch (e) {
                    if (!isCancelled) {
                        console.error('Unable to resolve initial address:', e);
                    }
                }
            }
        };

        const updateCoords = async () => {
            try {
                if (!address || address.trim() === '') {
                    return;
                }

                // Skip geocoding if address hasn't changed
                if (address === previousAddressRef.current) {
                    return;
                }

                const newCoords = await getCoordinates(address);
                if (!isCancelled && newCoords) {
                    setCoordinates(newCoords);
                    previousAddressRef.current = address;
                }
            } catch (e) {
                if (!isCancelled) {
                    console.error('Unable to resolve coordinates from address:', e);
                }
            }
        };

        // Only run initial page load if address is empty
        if (!address || address.trim() === '') {
            initialPageLoad();
        }

        // Only update coordinates if address is different from previous
        if (address && address.trim() !== '' && address !== previousAddressRef.current) {
            updateCoords();
        }

        return () => {
            isCancelled = true;
            aborter.abort();
        };
    }, [address]);

    return { address, setAddress, coordinates, setCoordinates };
};

export default useClientAddress;
