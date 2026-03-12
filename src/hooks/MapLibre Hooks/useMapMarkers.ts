import { useEffect, useCallback, useRef, useState } from 'react';
import { useMapLibreContext } from '../../context/MapLibreContext';
import maplibregl from 'maplibre-gl';
import useParkFeatures from './useParkFeatures';
import type { ParkMarkerPayload, UseMapMarkersParams } from '../../types/mapLibre';

/** 
 * Syncs park features with the MapLibre instance, creates markers, and wires click handlers. 
 **/
const useMapMarkers = ({ onMarkerOpen }: UseMapMarkersParams) => {
    const mapMarkers = useRef<maplibregl.Marker[]>([]);
    const { mapInstance, mapReady } = useMapLibreContext();
    const [bounds, setBounds] = useState<{
        northEast: { lat: number; lng: number } | null;
        southWest: { lat: number; lng: number } | null;
    }>({ northEast: null, southWest: null });
    const { parkFeatures } = useParkFeatures(bounds.northEast, bounds.southWest);

    const setMapMarkers = useCallback(
        (features: ParkMarkerPayload[]) => {
            if (!mapInstance.current || !mapReady || !features?.length) return;

            mapMarkers.current = features.map((feature) => {
                const marker = new maplibregl.Marker()
                    .setLngLat([feature.longitude, feature.latitude])
                    .addTo(mapInstance.current!);

                marker.getElement().addEventListener('click', () => onMarkerOpen(feature));
                return marker;
            });
        },
        [mapInstance, onMarkerOpen, mapReady]
    );

    const clearMapMarkers = useCallback(() => {
        mapMarkers.current.forEach((m) => m.remove());
        mapMarkers.current = [];
    }, []);

    useEffect(() => {
        const map = mapInstance.current;
        if (!map || !mapReady) return;

        const loadMarkersInBounds = () => {
            const b = map.getBounds();
            setBounds({ northEast: b.getNorthEast(), southWest: b.getSouthWest() });
        };

        loadMarkersInBounds();
        map.on('moveend', loadMarkersInBounds);
        return () => {
            map.off('moveend', loadMarkersInBounds);
        };
    }, [mapInstance, mapReady]);

    useEffect(() => {
        if (!parkFeatures?.length) {
            clearMapMarkers();
            return;
        }
        clearMapMarkers();
        setMapMarkers(parkFeatures);
    }, [parkFeatures, setMapMarkers, clearMapMarkers]);

    return { setMapMarkers };
};

export default useMapMarkers;
