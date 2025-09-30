import { useEffect, useState } from 'react';

const useMapMarkers = () => {
    const [mapMarkers, setMapMarkers] = useState([]);

    useEffect(
        {
            // Get map markers from supabase (map features)
            // create maplibre marker objects for each marker
            // add marker to map libre instance

            // learn how to remove map marker instances from maplibre instance
        },
        []
    );

    return <></>;
};

export default useMapMarkers;
