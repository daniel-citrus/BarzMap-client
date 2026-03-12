import { useState, useEffect } from 'react';
import type { ParkMarkerPayload } from '../../types/mapLibre';

interface Bounds {
    lat: number;
    lng: number;
}

/** Fetches park features within a geographic bounding box. */
const useParkFeatures = (
    northEast: Bounds | null = null,
    southWest: Bounds | null = null
) => {
    const [parkFeatures, setParkFeatures] = useState<ParkMarkerPayload[] | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!northEast || !southWest) return;

        const loadParks = async () => {
            setError(null);
            try {
                const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';
                const url = new URL(`${baseUrl}/api/park/location`);

                url.searchParams.append('min_latitude', southWest.lat.toString());
                url.searchParams.append('max_latitude', northEast.lat.toString());
                url.searchParams.append('min_longitude', southWest.lng.toString());
                url.searchParams.append('max_longitude', northEast.lng.toString());

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch park features: ${response.status} ${response.statusText}`
                    );
                }

                const data = await response.json();
                const features = Array.isArray(data) ? data : (data.data ?? data.features ?? []);
                setParkFeatures(features as ParkMarkerPayload[]);
            } catch (err) {
                setError(err instanceof Error ? err : new Error(String(err)));
                setParkFeatures(null);
            }
        };

        loadParks();
    }, [northEast, southWest]);

    return { parkFeatures, error };
};

export default useParkFeatures;
