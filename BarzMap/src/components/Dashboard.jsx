import MapLibreMap from './MapLibre';
import SearchInput from './SearchInput';
import useClientAddress from '../hooks/useClientAddress';
import { useEffect } from 'react';
import { useMapLibreContext } from '../context/MapLibreContext';

const Dashboard = () => {
    const { address, setAddress, coordinates } = useClientAddress();
    const { mapInstance } = useMapLibreContext();

    useEffect(() => {
        if (!mapInstance.current || !coordinates) {
            return;
        }

        mapInstance.current.flyTo({
            center: [coordinates.longitude, coordinates.latitude],
            zoom: 14,
        });
    }, [mapInstance, coordinates]);

    const onNewAddress = (address) => {
        setAddress(address);
        if (!mapInstance.current || !coordinates) {
            return;
        }

        mapInstance.current.flyTo({
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
