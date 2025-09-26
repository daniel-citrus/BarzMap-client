import { createContext, useContext, useMemo } from 'react';
import useMapLibreInstance from '../hooks/useMapLibreInstance';

const MapLibreContext = createContext(null);

const MapLibreProvider = ({ children }) => {
    const { mapContainerRef, mapInstance, setMarkers } = useMapLibreInstance();

    const value = useMemo(
        () => ({ mapContainerRef, mapInstance, setMarkers }),
        [mapContainerRef, mapInstance, setMarkers]
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
