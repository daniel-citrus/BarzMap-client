import { useContext } from 'react';
import { MapLibreContext } from '../../context/MapLibreContext';

const MapLibreMap = () => {
    const { mapContainerRef } = useContext(MapLibreContext)!;

    return <div ref={mapContainerRef} className='h-full w-full' />;
};

export default MapLibreMap;
