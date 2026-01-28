import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch park submissions from the backend API
 * @returns {{parkSubmissions: Array|null, loading: boolean, error: Error|null}} Submissions data, loading state, and error state
 */
const useParkSubmissions = () => {
    const [parkSubmissions, setParkSubmissions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true);
            setError(null);

            const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';
            const url = `${baseUrl}/api/authenticated/parks/`;

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
                setError(err);
                setParkSubmissions(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    return { parkSubmissions, loading, error };
};

export default useParkSubmissions;
