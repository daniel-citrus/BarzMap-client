import { createContext, useMemo, type ReactNode } from 'react';
import type { MapLibreInstanceValue } from '../types/mapLibre';
import useMapLibreInstance from '../hooks/MapLibre Hooks/useMapLibreInstance';

const MapLibreContext = createContext<MapLibreInstanceValue | null>(null);

const MapLibreProvider = ({ children }: { children: ReactNode }) => {
    const { mapContainerRef, mapInstance, mapReady } = useMapLibreInstance();

    const value = useMemo<MapLibreInstanceValue>(
        () => ({ mapContainerRef, mapInstance, mapReady }),
        [mapContainerRef, mapInstance, mapReady]
    );

    return (
        <MapLibreContext.Provider value={value}>
            {children}
        </MapLibreContext.Provider>
    );
};

export { MapLibreProvider, MapLibreContext };
