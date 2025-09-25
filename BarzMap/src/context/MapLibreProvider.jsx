import { useMemo } from 'react';
import MapLibreContext from './MapLibreContext';
import useMapLibreInstance from '../hooks/useMapLibreInstance';

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

export default MapLibreProvider;
