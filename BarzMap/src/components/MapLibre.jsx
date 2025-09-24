import useMapLibreInstance from '../hooks/useMapLibreInstance';
const MapLibreMap = () => {
    const { mapInstance, mapContainerRef, setMarkers } = useMapLibreInstance();

    return <div ref={mapContainerRef} className='h-full w-full' />;
};

export default MapLibreMap;
