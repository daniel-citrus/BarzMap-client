const useParkSubmissionActions = () => {
    const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';

    const approve = async (id, comment = '') => {
        await handleSubmission(id, 'approved', comment)
    };

    const reject = async (id, comment = '') => {
        await handleSubmission(id, 'rejected', comment);
    };

    const markPending = async (id, comment = '') => {
        await handleSubmission(id, 'pending', comment);
    };

    const deleteSubmission = async (id) => {
        await handleSubmission(id, 'delete')
    };

    const handleSubmission = async (id, action, comment = '') => {
        const url = `${baseUrl}/api/park/${id}`;

        try {
            const response = await fetch(url, {
                method: action === 'delete' ? 'DELETE' : 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: action,
                    comment: comment.trim()
                }),
            });

            const text = await response.text();

            if (!text) {
                return null;
            }

            const result = await text.json()

            console.log(`Action Success: ${action}; submission:`, result);
            return result;
        } catch (error) {
            console.error(`Unable to delete submission: ${id}. Error:`, error);
            throw error;
        }
    }

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

    return { approve, reject, markPending, deleteSubmission };
};

export default useParkSubmissionActions;

