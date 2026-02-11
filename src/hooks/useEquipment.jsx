import { useEffect, useState } from "react"

const useEquipment = () => {
    const [equipment, setEquipment] = useState([]);


    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';
        const url = new URL(`${baseUrl}/api/equipment/?skip=0`);

        const getEquipment = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch equipment: ${response.status}`);
                }

                const result = await response.json();
                setEquipment(result);
            } catch (error) {
                console.error('Error fetching equipment:', error);
                setEquipment([]);
            }
        };

        getEquipment()
    }, [])


    return { equipment }
}

export default useEquipment