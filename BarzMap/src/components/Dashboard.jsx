import MapLibreMap from './MapLibre';
import SearchInput from './SearchInput';
import useClientAddress from '../hooks/useClientAddress';
import { useCallback, useEffect, useState } from 'react';
import { useMapLibreContext } from '../context/MapLibreContext';
import useMapMarkers from '../hooks/MapLibre Hooks/useMapMarkers';
import DetailedPopup from './map/markers/DetailedPopup';

const Dashboard = () => {
    const { address, setAddress, coordinates } = useClientAddress();
    const { mapInstance } = useMapLibreContext();
    const [selectedMarker, setSelectedMarker] = useState();
    const onDetailedPopupOpen = useCallback((data) => {
        setSelectedMarker(data);
    }, []);
    const onDetailedPopupClose = useCallback(() => {
        setSelectedMarker(null);
    }, []);

    useMapMarkers({ onMarkerOpen: onDetailedPopupOpen });

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
            {selectedMarker !== null && (
                <DetailedPopup onClose={onDetailedPopupClose} />
            )}
            <MapLibreMap />
        </div>
    );
};

export default Dashboard;
