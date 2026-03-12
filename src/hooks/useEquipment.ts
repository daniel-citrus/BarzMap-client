import { useEffect, useState } from 'react';

interface EquipmentItem {
    id: number;
    name: string;
    [key: string]: unknown;
}

const useEquipment = () => {
    const [equipment, setEquipment] = useState<EquipmentItem[]>([]);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';
        const url = new URL(`${baseUrl}/api/equipment/?skip=0`);

        const getEquipment = async () => {
            try {
                const response = await fetch(url, { method: 'GET' });

                if (!response.ok) {
                    throw new Error(`Failed to fetch equipment: ${response.status}`);
                }

                const result = await response.json();
                setEquipment(Array.isArray(result) ? result : []);
            } catch (error) {
                console.error('Error fetching equipment:', error);
                setEquipment([]);
            }
        };

        getEquipment();
    }, []);

    return { equipment };
};

export default useEquipment;
