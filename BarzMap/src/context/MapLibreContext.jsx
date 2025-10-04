import { createContext, useContext, useMemo } from 'react';
import useMapLibreInstance from '../hooks/MapLibre Hooks/useMapLibreInstance';

const MapLibreContext = createContext(null);

const MapLibreProvider = ({ children }) => {
    const { mapContainerRef, mapInstance , mapReady} = useMapLibreInstance();

    const value = useMemo(
        () => ({ mapContainerRef, mapInstance, mapReady }),
        [mapContainerRef, mapInstance, mapReady]
    );

    return (
        <MapLibreContext.Provider value={value}>
            {children}
        </MapLibreContext.Provider>
    );
};

const useMapLibreContext = () => {
    const context = useContext(MapLibreContext);

    if (!context) {
        throw new Error(
            'useMapLibreContext must be used inside a MapLibreProvider.'
        );
    }

    return context;
};

export { MapLibreProvider, useMapLibreContext };
