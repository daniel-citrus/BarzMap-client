import useMapLibreContext from '../context/useMapLibreContext';

const MapLibreMap = () => {
    const { mapContainerRef } = useMapLibreContext();

    return <div ref={mapContainerRef} className='h-full w-full' />;
};

export default MapLibreMap;
