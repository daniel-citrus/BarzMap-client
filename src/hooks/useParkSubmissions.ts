import { useState, useEffect } from 'react';
import type { ParkMarkerPayload } from '../types/mapLibre';

/** Fetches park submissions from the backend API. */
const useParkSubmissions = () => {
    const [parkSubmissions, setParkSubmissions] = useState<ParkMarkerPayload[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true);
            setError(null);

            const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';
            const url = `${baseUrl}/api/park/`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch park submissions: ${response.status} ${response.statusText}`
                    );
                }

                const data = await response.json();
                setParkSubmissions(data || []);
            } catch (err) {
                console.error('Error fetching park submissions:', err);
                setError(err instanceof Error ? err : new Error(String(err)));
                setParkSubmissions(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [refreshTrigger]);

    const refresh = () => setRefreshTrigger((prev) => prev + 1);

    return { parkSubmissions, loading, error, refresh };
};

export default useParkSubmissions;
