import { createContext, useContext, useMemo } from 'react';
import useMapLibreInstance from '../hooks/MapLibre Hooks/useMapLibreInstance';

const MapLibreContext = createContext(null);

const MapLibreProvider = ({ children }) => {
    const { mapContainerRef, mapInstance } = useMapLibreInstance();

    const value = useMemo(
        () => ({ mapContainerRef, mapInstance }),
        [mapContainerRef, mapInstance]
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

export { MapLibreContext, MapLibreProvider, useMapLibreContext };
