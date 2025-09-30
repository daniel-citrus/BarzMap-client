import MapLibreMap from './MapLibre';
import SearchInput from './SearchInput';
import useClientAddress from '../hooks/useClientAddress';
import { useEffect } from 'react';
import { useMapLibreContext } from '../context/MapLibreContext';
import useSampleParkData from '../hooks/useSampleParkData';

const Dashboard = () => {
    const { address, setAddress, coordinates } = useClientAddress();
    const { mapInstance, setMarkers } = useMapLibreContext();
    const { parks } = useSampleParkData();

    useEffect(() => {
        if (coordinates) {
            mapInstance.flyTo({
                center: [coordinates.longitude, coordinates.latitude],
                zoom: 14,
            });
        }
    }, [mapInstance, coordinates, setMarkers, parks]);

    const onNewAddress = (address) => {
        setAddress(address);
        mapInstance.flyTo({
            center: [coordinates.longitude, coordinates.latitude],
            zoom: 14,
        });
    };

    return (
        <div className='relative h-screen w-full overflow-hidden bg-slate-100'>
            <SearchInput searchValue={address} onSearch={onNewAddress} />
            <MapLibreMap />
        </div>
    );
};

export default Dashboard;
