import { useEffect, useState, useCallback, useRef } from 'react';
import { useMapLibreContext } from '../context/MapLibreContext';
import maplibregl from 'maplibre-gl';

const useMapMarkers = () => {
    const [mapMarkers, setMapMarkers] = useState([]);
    const markersRef = useRef([]);

    const { mapInstance } = useMapLibreContext();

    const setMarkers = useCallback(
        (featureCollection) => {
            if (!mapInstance.current || !featureCollection?.features) {
                return;
            }

            markersRef.current.forEach((marker) => marker.remove());

            markersRef.current = featureCollection.features.map((feature) => {
                const [longitude, latitude] = feature.geometry.coordinates;

                return new maplibregl.Marker()
                    .setLngLat([longitude, latitude])
                    .setPopup(
                        new maplibregl.Popup().setText(feature.properties.name)
                    )
                    .addTo(mapInstance.current);
            });
        },
        [mapInstance]
    );

    useEffect(() => {
        // Get map markers from supabase (map features)
        // create maplibre marker objects for each marker
        // add marker to map libre instance
        // learn how to remove map marker instances from maplibre instance

        return () => {
            
        };
    }, []);

    return { setMarkers };
};

export default useMapMarkers;
