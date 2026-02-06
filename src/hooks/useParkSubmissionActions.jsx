const useParkSubmissionActions = () => {
    const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';

    const approve = async (id, comment = '') => {
        const url = `${baseUrl}/api/admin/park-submissions/${id}/approve`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: comment.trim() }),
            });

            if (!response.ok) {
                throw new Error(`Failed to approve submission: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Approved submission:', result);
            return result;
        } catch (error) {
            console.error(`Unable to approve submission: ${id}. Error:`, error);
            throw error;
        }
    };

    const deny = async (id, comment = '') => {
        const url = `${baseUrl}/api/admin/park-submissions/${id}/deny`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: comment.trim() }),
            });

            if (!response.ok) {
                throw new Error(`Failed to deny submission: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error(`Unable to deny submission: ${id}. Error:`, error);
            throw error;
        }
    };

    const markPending = async (id, comment = '') => {
        const url = `${baseUrl}/api/admin/park-submissions/${id}/pending`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: comment.trim() }),
            });

            if (!response.ok) {
                throw new Error(`Failed to mark submission as pending: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Marked submission as pending:', result);
            return result;
        } catch (error) {
            console.error(`Unable to mark submission as pending: ${id}. Error:`, error);
            throw error;
        }
    };

    const deleteSubmission = async (id) => {
        const url = `${baseUrl}/api/admin/park-submissions/${id}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete submission: ${response.status} ${response.statusText}`);
            }

            // DELETE returns 204 No Content, so no JSON to parse
            if (response.status === 204) {
                console.log('Deleted submission:', id);
                return { success: true };
            }

            const result = await response.json();
            console.log('Deleted submission:', result);
            return result;
        } catch (error) {
            console.error(`Unable to delete submission: ${id}. Error:`, error);
            throw error;
        }
    };

    const submitPark = async ({
        name,
        description,
        latitude,
        longitude,
        address,
        submitted_by = null,
        images = []
    }) => {

    }

    return { approve, deny, markPending, deleteSubmission };
};

export default useParkSubmissionActions;

