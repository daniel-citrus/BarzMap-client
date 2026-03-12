import { useState, useEffect, useRef } from 'react';

export interface UseParkEventsOptions {
    lat?: number;
    lng?: number;
    radius?: number;
    limit?: number;
    fromDate?: string;
}

interface ParkEvent {
    [key: string]: unknown;
}

/** Fetches park events from the backend API with optional location filters. */
const useParkEvents = (options: UseParkEventsOptions = {}) => {
    const [parkEvents, setParkEvents] = useState<ParkEvent[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const previousParamsRef = useRef<string | null>(null);

    const { lat, lng, radius, limit, fromDate } = options;

    useEffect(() => {
        const currentParams = JSON.stringify({ lat, lng, radius, limit, fromDate });

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
                const events = Array.isArray(data) ? data : (data.data ?? []);
                setParkEvents(events);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError(err instanceof Error ? err : new Error(String(err)));
                setParkEvents(null);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [lat, lng, radius, limit, fromDate]);

    return { parkEvents, loading, error };
};

export default useParkEvents;
