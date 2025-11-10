import MapLibreMap from './MapLibreMap';
import SearchInput from './SearchInput';
import useClientAddress from '../../hooks/useClientAddress';
import { useCallback, useEffect, useState } from 'react';
import { useMapLibreContext } from '../../context/MapLibreContext';
import useMapMarkers from '../../hooks/MapLibre Hooks/useMapMarkers';
import DetailedPopup from './markers/DetailedPopup';
import MenuButton from './MenuButton';
import NavigationMenu from './NavigationMenu';


const Dashboard = () => {
    const { address, setAddress, coordinates } = useClientAddress();
    const { mapInstance } = useMapLibreContext();
    const [selectedMarker, setSelectedMarker] = useState(null);

    const onShowParkSubmission = () => { }
    const onShowDisplayBoard = () => { }
    const onShowFAQ = () => { }

    const onDetailedPopupOpen = useCallback((data) => {
        setSelectedMarker(data);
    }, []);

    const onDetailedPopupClose = useCallback(() => {
        setSelectedMarker(null);
    }, []);

    const navigationLinkData = [
        {
            id: 0,
            title: 'Submit a Park',
            action: onShowParkSubmission
        },
        {
            id: 1,
            title: 'Events Board',
            actions: onShowDisplayBoard
        },
        {
            id: 2,
            title: 'FAQ',
            actions: onShowFAQ
        }
    ]

    useMapMarkers({ onMarkerOpen: onDetailedPopupOpen });

    // Recenter map when coordinates are updated
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
    };

    const openMenu = () => {
        console.log('menu opened')
    }

    const closeMenu = () => {
        console.log('close menu')
    }

    return (
        <div className='relative h-screen w-full overflow-hidden bg-slate-100'>
            <div className='pointer-events-none absolute left-3 right-3 top-3 z-30 flex items-center gap-3 sm:left-6 sm:right-6 sm:top-6'>
                <MenuButton
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    className='pointer-events-auto shrink-0 bg-white/90 text-slate-800 shadow-lg shadow-slate-900/10 hover:bg-white focus-visible:ring-slate-500/40'
                />
                <NavigationMenu linkData={navigationLinkData} />
                <SearchInput
                    searchValue={address}
                    onSearch={onNewAddress}
                    className='pointer-events-auto w-full sm:max-w-3xl'
                />
            </div>
            {selectedMarker !== null && (
                <DetailedPopup
                    title={selectedMarker.title}
                    images={''}
                    equipments={selectedMarker.equipment}
                    address={selectedMarker.address}
                    onClose={onDetailedPopupClose}
                />
            )}
            <MapLibreMap />
        </div>
    );
};

export default Dashboard;
