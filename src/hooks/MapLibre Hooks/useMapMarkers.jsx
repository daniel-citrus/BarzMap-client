import { useEffect, useCallback, useRef, useState } from 'react';
import { useMapLibreContext } from '../../context/MapLibreContext';
import maplibregl from 'maplibre-gl';
import useParkFeatures from './useParkFeatures';

/**
 * Synchronizes GeoJSON park features with the active MapLibre instance by
 * creating marker elements, wiring click handlers, and exposing a setter
 * so callers can generate markers for arbitrary feature arrays.
 *
 * @param {{ onMarkerOpen: (payload: {
 *   title: string,
 *   equipment: any,
 *   address: string,
 *   longitude: number,
 *   latitude: number
 * }) => void }} params - Callback invoked when a marker is clicked.
 * @returns {{ setMapMarkers: (features: import('geojson').Feature[]) => void }}
 */
const useMapMarkers = ({ onMarkerOpen }) => {
    const mapMarkers = useRef([]);
    const { mapInstance, mapReady } = useMapLibreContext();
    const [bounds, setBounds] = useState({ northEast: null, southWest: null });
    const { parkFeatures } = useParkFeatures(bounds.northEast, bounds.southWest);

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
                const longitude = feature.longitude;
                const latitude = feature.latitude;
                const marker = new maplibregl.Marker()
                    .setLngLat([longitude, latitude])
                    .addTo(mapInstance.current);

                marker.getElement().addEventListener('click', () => {
                    const payload = {
                        address: feature.address,
                        admin_notes: feature.admin_notes,
                        approved_at: feature.approved_at,
                        approved_by: feature.approved_by,
                        city: feature.city,
                        country: feature.country,
                        created_at: feature.created_at,
                        description: feature.description,
                        id: feature.id,
                        latitude: feature.latitude,
                        longitude: feature.longitude,
                        name: feature.name,
                        postal_code: feature.postal_code,
                        state: feature.state,
                        status: feature.status,
                        submit_date: feature.submit_date,
                        submitted_by: feature.submitted_by,
                        updated_at: feature.updated_at,
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
            const northEast = boundaries.getNorthEast();
            const southWest = boundaries.getSouthWest();

            // Update bounds state to trigger useParkFeatures hook
            setBounds({ northEast, southWest });
        };

        loadMarkersInBounds();
        map.on('moveend', loadMarkersInBounds);

        return () => {
            map.off('moveend', loadMarkersInBounds);
        };
    }, [mapInstance, mapReady]);

    /* Update markers when parkFeatures change */
    useEffect(() => {
        if (!parkFeatures || !Array.isArray(parkFeatures) || parkFeatures.length === 0) {
            clearMapMarkers();
            return;
        }

        clearMapMarkers();
        setMapMarkers(parkFeatures);
    }, [parkFeatures, setMapMarkers]);

    return { setMapMarkers };
};

export default useMapMarkers;
