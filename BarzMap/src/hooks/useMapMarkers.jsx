import { useEffect, useCallback, useRef } from 'react';
import { useMapLibreContext } from '../context/MapLibreContext';
import maplibregl from 'maplibre-gl';
import useSampleParkData from '../hooks/useSampleParkData';
import detailedPopup from '../components/map/markers/detailedPopup';

const useMapMarkers = () => {
    const { parks } = useSampleParkData(); // replace this with a hook w/ useEffect that pulls all relevant park data
    const mapMarkers = useRef([]);
    const { mapInstance } = useMapLibreContext();

    const setMapMarkers = useCallback(
        (featureCollection) => {
            if (!mapInstance.current || !featureCollection?.features) {
                return;
            }

            mapMarkers.current = featureCollection.features.map((feature) => {
                const [longitude, latitude] = feature.geometry.coordinates;

                return new maplibregl.Marker()
                    .setLngLat([longitude, latitude])
                    .setPopup(
                        new maplibregl.Popup()
                            .setText(feature.properties.name)
                            .setDOMContent()
                    )
                    .addTo(mapInstance.current);
            });
        },
        [mapInstance]
    );

    setMapMarkers(parks); // remove when map marker effect is setup

    useEffect(() => {
        // Get map markers from supabase (map features)
        // create maplibre marker objects for each marker
        // add marker to map libre instance
        // learn how to remove map marker instances from maplibre instance
        setMapMarkers(parks);

        return () => {
            mapMarkers.current.forEach((marker) => marker.remove());
        };
    }, [parks, setMapMarkers]);

    return { setMapMarkers };
};

export default useMapMarkers;
