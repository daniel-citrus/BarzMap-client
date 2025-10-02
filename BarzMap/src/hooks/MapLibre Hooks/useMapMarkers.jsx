import { useEffect, useCallback, useRef } from 'react';
import { useMapLibreContext } from '../../context/MapLibreContext';
import { createRoot } from 'react-dom/client';
import maplibregl from 'maplibre-gl';
import useSampleParkData from '../useSampleParkData';
import DetailedPopup from '../../components/map/markers/detailedPopup';

const useMapMarkers = () => {
    const { parks } = useSampleParkData(); // replace this with a hook w/ useEffect that pulls all relevant park data
    const mapMarkers = useRef([]);
    const { mapInstance } = useMapLibreContext();

    const detailedPopupElement = useRef(document.createElement('div')); // detailed popup element
    const detailedPopupNode = useRef(createRoot(detailedPopupElement.current)); // node used to render popup element into DOM
    const detailedPopupInstance = useRef(maplibregl.Popup()); // MapLibre popup object instance for rendering popup into the map

    const setMapMarkers = useCallback(
        (featureCollection) => {
            if (!mapInstance.current || !featureCollection?.features) {
                return;
            }

            mapMarkers.current = featureCollection.features.map((feature) => {
                const [longitude, latitude] = feature.geometry.coordinates;
                const marker = new maplibregl.Marker()
                    .setLngLat([longitude, latitude])
                    .addTo(mapInstance.current);

                marker.getElement().addEventListener('click', () => {
                    onDetailOpen();
                });

                return marker;
            });
        },
        [mapInstance]
    );

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
