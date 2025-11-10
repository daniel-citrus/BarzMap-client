import { useEffect, useCallback, useRef } from 'react';
import { useMapLibreContext } from '../../context/MapLibreContext';
import maplibregl from 'maplibre-gl';
import useMapHelpers from './useMapHelpers';

/**
 * Synchronizes GeoJSON park features with the active MapLibre instance by
 * creating marker elements, wiring click handlers, and exposing a setter
 * so callers can generate markers for arbitrary feature arrays.
 *
 * @param {{ onMarkerOpen: (payload: {
 *   title: string,
 *   equipment: any,
 *   address: string,
 *   coordinates: [number, number]
 * }) => void }} params - Callback invoked when a marker is clicked.
 * @returns {{ setMapMarkers: (features: import('geojson').Feature[]) => void }}
 */
const useMapMarkers = ({ onMarkerOpen }) => {
    const mapMarkers = useRef([]);
    const { mapInstance, mapReady } = useMapLibreContext();
    const { getFeaturesWithinBounds } = useMapHelpers();

    /**
     * Accepts raw GeoJSON features and mounts maplibre marker instances for each.
     *
     * @param {import('geojson').Feature[]} features
     */
    const setMapMarkers = useCallback(
        (features) => {
            if (!mapInstance.current || !mapReady || !features) {
                return;
            }

            mapMarkers.current = features.map((feature) => {
                const [longitude, latitude] = feature.geometry.coordinates;
                const marker = new maplibregl.Marker()
                    .setLngLat([longitude, latitude])
                    .addTo(mapInstance.current);

                marker.getElement().addEventListener('click', () => {
                    const payload = {
                        title: feature.properties.name,
                        equipment: feature.properties.equipment,
                        address: feature.properties.address,
                        coordinates: feature.geometry.coordinates,
                    };
                    onMarkerOpen(payload);
                });

                return marker;
            });
        },
        [mapInstance, onMarkerOpen, mapReady]
    );

    const clearMapMarkers = () => {
        mapMarkers.current.forEach((marker) => marker.remove());
    };

    /* Handles re-renders of map markers after map movement */
    useEffect(() => {
        const map = mapInstance.current;

        if (!map || !mapReady) {
            return;
        }

        const loadMarkersInBounds = () => {
            const boundaries = map.getBounds();
            const features = getFeaturesWithinBounds(
                boundaries._ne,
                boundaries._sw
            );

            clearMapMarkers();
            setMapMarkers(features);
        };

        loadMarkersInBounds();
        map.on('moveend', loadMarkersInBounds);

        return () => {
            clearMapMarkers();
            map.off('moveend', loadMarkersInBounds);
        };
    }, [mapInstance, getFeaturesWithinBounds, setMapMarkers, mapReady]);

    return { setMapMarkers };
};

export default useMapMarkers;
