import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to fetch park events from the backend API
 * @param {Object} options - Query parameters for events
 * @param {number} [options.lat] - Latitude for distance calculations
 * @param {number} [options.lng] - Longitude for distance calculations
 * @param {number} [options.radius] - Radius in miles (required if lat/lng provided)
 * @param {number} [options.limit] - Maximum number of events to return (default: 10)
 * @param {string} [options.fromDate] - ISO-8601 timestamp to filter events after this date
 * @returns {{parkEvents: Array|null, loading: boolean, error: Error|null}} Events data, loading state, and error state
 */
const useParkEvents = (options = {}) => {
    const [parkEvents, setParkEvents] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const previousParamsRef = useRef(null);

    useEffect(() => {
        const { lat, lng, radius, limit, fromDate } = options;

        // Create a normalized params object for comparison
        const currentParams = JSON.stringify({ lat, lng, radius, limit, fromDate });

        // Skip fetch if parameters haven't changed (but always fetch on initial mount)
        if (previousParamsRef.current !== null && currentParams === previousParamsRef.current) {
            return;
        }

        previousParamsRef.current = currentParams;

        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';
            const url = new URL(`${baseUrl}/api/events/`);

            if (lat !== undefined && lng !== undefined) {
                url.searchParams.append('lat', lat.toString());
                url.searchParams.append('lng', lng.toString());
                if (radius !== undefined) {
                    url.searchParams.append('radius', radius.toString());
                }
            }

            if (limit !== undefined) {
                url.searchParams.append('limit', limit.toString());
            }

            if (fromDate) {
                url.searchParams.append('fromDate', fromDate);
            }

            try {
                const response = await fetch(url.toString());

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch events: ${response.status} ${response.statusText}`
                    );
                }

                const data = await response.json();
                // Handle both array response and { data: [...] } response formats
                const events = Array.isArray(data) ? data : (data.data || []);
                console.log('Fetched events:', events);
                setParkEvents(events);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError(err);
                setParkEvents(null);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.lat, options.lng, options.radius, options.limit, options.fromDate]);

    return { parkEvents, loading, error };
};

export default useParkEvents;
