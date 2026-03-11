import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { MapLibreInstanceValue } from '../types';
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

/** All descendants of the MapLibreProvider can use this hook to access the MapLibre context value */
const useMapLibreContext = (): MapLibreInstanceValue => {
    const context = useContext(MapLibreContext);

    if (!context) {
        throw new Error(
            'useMapLibreContext must be used inside a MapLibreProvider.'
        );
    }

    return context;
};

export { MapLibreProvider, useMapLibreContext };
