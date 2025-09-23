import { useEffect, useState } from 'react';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_CLOUD_API;

const buildEndpoint = (latitude, longitude) => {
    const params = new URLSearchParams({ key: MAPTILER_API_KEY ?? '' });

    return `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?${params.toString()}`;
};

const extractAddress = (payload) => {
    const primaryFeature = payload?.features?.[0];

    if (!primaryFeature) {
        return '';
    }

    return primaryFeature.place_name;
};

const useUserAddress = () => {
    const [address, setAddress] = useState('');

    useEffect(() => {
        const resolveAddress = async () => {
            const storedAddress = window.localStorage.getItem('storedAddress');

            if (storedAddress) {
                setAddress(storedAddress);
                return;
            }

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

            // If new address is provided, update localStorage
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 10_000,
                        maximumAge: 0,
                    });
                });

                const { latitude, longitude } = position.coords;
                const response = await fetch(
                    buildEndpoint(latitude, longitude)
                );

                if (!response.ok) {
                    throw new Error(
                        `MapTiler request failed with status ${response.status}`
                    );
                }

                const payload = await response.json();

                const newAddress = extractAddress(payload);
                setAddress(newAddress);
                window.localStorage.setItem('storedAddress', newAddress);
            } catch (error) {
                console.error('Unable to determine user address:', error);
            }
        };

        resolveAddress();
    }, []);

    return { address, setAddress };
};

export default useUserAddress;
