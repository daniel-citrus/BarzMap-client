import { useState, useEffect } from "react";

/**
 * Custom hook to fetch park features within a geographic bounding box.
 * 
 * @param {Object|null} northEast - Northeast corner of the bounding box with {lat, lng} properties
 * @param {Object|null} southWest - Southwest corner of the bounding box with {lat, lng} properties
 * @returns {Object} Object containing:
 *   - parkFeatures: Array of park features within the specified bounds (null if not loaded or on error)
 *   - error: Error object if the fetch failed (null otherwise)
 */
const useParkFeatures = (northEast = null, southWest = null) => {
    const [parkFeatures, setParkFeatures] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Don't fetch if bounds are not provided
        if (!northEast || !southWest) {
            return;
        }

        const loadParks = async () => {
            setError(null);

            try {
                const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';
                const url = new URL(`${baseUrl}/api/authenticated/parks/location`);

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
                const features = Array.isArray(data) ? data : (data.data || data.features || []);
                setParkFeatures(features);
            } catch (err) {
                setError(err);
                setParkFeatures(null);
            }
        };

        loadParks();
    }, [northEast, southWest]);

    return { parkFeatures, error }
}

export default useParkFeatures