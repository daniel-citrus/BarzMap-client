import { useEffect, useState, useRef } from 'react';
import { resolveAddress, getCoordinates } from '../lib/geocoding';
import type { Coordinates } from '../lib/geocoding';

/** Resolves client address and coordinates via MapTiler geocoding, with localStorage caching. */
const useClientAddress = () => {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const previousAddressRef = useRef('');

    useEffect(() => {
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
                if (!address || address.trim() === '') return;
                if (address === previousAddressRef.current) return;

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

        if (!address || address.trim() === '') {
            initialPageLoad();
        }

        if (address && address.trim() !== '' && address !== previousAddressRef.current) {
            updateCoords();
        }

        return () => {
            isCancelled = true;
        };
    }, [address]);

    return { address, setAddress, coordinates, setCoordinates };
};

export default useClientAddress;
