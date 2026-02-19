const useParkSubmissionActions = () => {
    const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';

    const approve = async (id, comment = '') => {
        await handleAction(id, 'approved', comment)
    };

    const reject = async (id, comment = '') => {
        await handleAction(id, 'rejected', comment);
    };

    const markPending = async (id, comment = '') => {
        await handleAction(id, 'pending', comment);
    };

    const deleteSubmission = async (id) => {
        await handleAction(id, 'delete')
    };

    const handleAction = async (id, action, comment = '') => {
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

            const result = JSON.parse(text);

            console.log(`Action Success: ${action}; submission:`, result);
            return result;
        } catch (error) {
            console.error(`Unable to ${action} submission ${id}. Error:`, error);
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
        images = [],
        equipment_ids = []
    }) => {
        const submissionData = new FormData();

        // Append standard park data
        submissionData.append('name', name || '');
        submissionData.append('description', description || '');

        if (latitude) submissionData.append('latitude', latitude);
        if (longitude) submissionData.append('longitude', longitude);

        submissionData.append('address', address || '');

        images.forEach((image) => {
            if (image.file) {
                submissionData.append('images', image.file);
            } else {
                console.warn('Image missing file property:', image);
            }
        });

        if (equipment_ids && equipment_ids.length > 0) {
            submissionData.append('equipment_ids', JSON.stringify(equipment_ids));
        }

        const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';
        const url = `${baseUrl}/api/park/`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: submissionData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to submit: ${response.status} ${response.statusText}. ${errorText}`);
            }

            const result = await response.json();

            return result
        } catch (error) {
            throw error;
        }
    }

    return { approve, reject, markPending, deleteSubmission, submitPark };
};

export default useParkSubmissionActions;

