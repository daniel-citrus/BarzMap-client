import type { SubmitParkParams } from '../types/mapLibre';

type ActionStatus = 'approved' | 'rejected' | 'pending' | 'delete';

const useParkSubmissionActions = () => {
    const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';

    const handleAction = async (
        id: number | string,
        action: ActionStatus,
        comment = ''
    ): Promise<Record<string, unknown> | null> => {
        const url = `${baseUrl}/api/park/${id}`;

        try {
            const response = await fetch(url, {
                method: action === 'delete' ? 'DELETE' : 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: action,
                    comment: comment.trim(),
                }),
            });

            const text = await response.text();
            if (!text) return null;

            const result = JSON.parse(text);
            console.log(`Action Success: ${action}; submission:`, result);
            return result;
        } catch (error) {
            console.error(`Unable to ${action} submission ${id}. Error:`, error);
            throw error;
        }
    };

    const approve = async (id: number | string, comment = '') =>
        handleAction(id, 'approved', comment);

    const reject = async (id: number | string, comment = '') =>
        handleAction(id, 'rejected', comment);

    const markPending = async (id: number | string, comment = '') =>
        handleAction(id, 'pending', comment);

    const deleteSubmission = async (id: number | string) =>
        handleAction(id, 'delete');

    const submitPark = async (params: SubmitParkParams): Promise<Record<string, unknown>> => {
        const {
            name,
            description,
            latitude,
            longitude,
            address,
            images = [],
            equipment_ids = [],
        } = params;

        const submissionData = new FormData();
        submissionData.append('name', name || '');
        submissionData.append('description', description || '');
        if (latitude) submissionData.append('latitude', String(latitude));
        if (longitude) submissionData.append('longitude', String(longitude));
        submissionData.append('address', address || '');

        images.forEach((image) => {
            if (image.file) {
                submissionData.append('images', image.file);
            } else {
                console.warn('Image missing file property:', image);
            }
        });

        if (equipment_ids.length > 0) {
            submissionData.append('equipment_ids', JSON.stringify(equipment_ids));
        }

        const url = `${baseUrl}/api/park/`;

        const response = await fetch(url, {
            method: 'POST',
            body: submissionData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to submit: ${response.status} ${response.statusText}. ${errorText}`
            );
        }

        return response.json();
    };

    return { approve, reject, markPending, deleteSubmission, submitPark };
};

export default useParkSubmissionActions;
