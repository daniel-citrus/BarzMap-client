import { useEffect, useCallback, useRef } from 'react';
import { useMapLibreContext } from '../../context/MapLibreContext';
import { createRoot } from 'react-dom/client';
import maplibregl from 'maplibre-gl';
import useSampleParkData from '../useSampleParkData';
import DetailedPopup from '../../components/map/markers/DetailedPopup';

/**
 * Synchronizes GeoJSON park features with the active MapLibre instance by
 * creating marker elements, wiring click handlers, and exposing a setter
 * so callers can generate markers for arbitrary feature collections.
 *
 * @param {{ onMarkerOpen: (payload: {
 *   title: string,
 *   equipment: any,
 *   address: string,
 *   coordinates: [number, number]
 * }) => void }} params - Callback invoked when a marker is clicked.
 * @returns {{ setMapMarkers: (featureCollection: import('geojson').FeatureCollection) => void }}
 */
const useMapMarkers = ({ onMarkerOpen }) => {
    const { parks } = useSampleParkData(); // replace this with a hook w/ useEffect that pulls all relevant park data
    const mapMarkers = useRef([]);
    const { mapInstance } = useMapLibreContext();

    /* // detailed popup element
    const detailedPopupElement = useRef(document.createElement('div'));
    // node used to render popup element into DOM
    const detailedPopupNode = useRef(createRoot(detailedPopupElement.current));
    // MapLibre popup object instance for rendering popup into the map
    const detailedPopupInstance = useRef(new maplibregl.Popup()); */

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
                    const payload = {
                        title: feature.properties.name,
                        equipment: feature.properties.equipment,
                        address: feature.properties.address,
                        coordinates: feature.geometry.coordinates
                    }
                    onMarkerOpen(payload);
                });

                return marker;
            });
        },
        [mapInstance, onMarkerOpen]
    );

    setMapMarkers(parks);

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
