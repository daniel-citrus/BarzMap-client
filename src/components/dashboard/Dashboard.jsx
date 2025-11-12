import MapLibreMap from './MapLibreMap';
import SearchInput from './SearchInput';
import useClientAddress from '../../hooks/useClientAddress';
import { useCallback, useEffect, useState } from 'react';
import { useMapLibreContext } from '../../context/MapLibreContext';
import useMapMarkers from '../../hooks/MapLibre Hooks/useMapMarkers';
import DetailedPopup from './markers/DetailedPopup';
import MenuButton from './MenuButton';
import NavigationMenu from './NavigationMenu';
import ParkSubmissionForm from '../parkSubmission/ParkSubmissionForm';

const Dashboard = () => {
    const { address, setAddress, coordinates } = useClientAddress();
    const { mapInstance } = useMapLibreContext();
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [navigationOpen, setNavigationOpen] = useState(false);
    const [popupDisplayed, setPopupDisplayed] = useState(null);

    const onDetailedPopupOpen = useCallback((data) => {
        setSelectedMarker(data);
    }, []);

    const onDetailedPopupClose = useCallback(() => {
        setSelectedMarker(null);
    }, []);

    const onClosePage = () => {
        setPopupDisplayed(null);
    };

    const toggleNavMenu = () => {
        setNavigationOpen(!navigationOpen);
    };

    const closeMenu = () => {
        setNavigationOpen(false);
    };

    const navigationLinkData = [
        {
            id: 0,
            title: 'Submit a Park',
            action: () => {
                setPopupDisplayed('submitPark');
            },
        },
        {
            id: 1,
            title: 'Events Board',
            action: () => {
                setPopupDisplayed('eventsBoard');
            },
        },
        {
            id: 2,
            title: 'FAQ',
            action: () => {
                setPopupDisplayed('FAQ');
            },
        },
    ];

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

    return (
        <div className='relative h-screen w-full overflow-hidden bg-slate-100'>
            <div className='pointer-events-none absolute left-3 right-3 top-3 z-30 flex items-center gap-3 sm:left-6 sm:right-6 sm:top-6'>
                <MenuButton
                    menuOpen={navigationOpen}
                    toggleMenu={toggleNavMenu}
                    className='pointer-events-auto shrink-0 bg-white/90 text-slate-800 shadow-lg shadow-slate-900/10 hover:bg-white focus-visible:ring-slate-500/40'
                />
                <SearchInput
                    searchValue={address}
                    onSearch={onNewAddress}
                    className='pointer-events-auto w-full sm:max-w-3xl'
                />
            </div>
            <MapLibreMap />
            {selectedMarker !== null && (
                <DetailedPopup
                    title={selectedMarker.title}
                    images={''}
                    equipments={selectedMarker.equipment}
                    address={selectedMarker.address}
                    onClose={onDetailedPopupClose}
                />
            )}
            {navigationOpen && (
                <NavigationMenu
                    isOpen={navigationOpen}
                    onClose={closeMenu}
                    linkData={navigationLinkData}
                />
            )}
            {popupDisplayed === 'submitPark' && <ParkSubmissionForm />}
        </div>
    );
};

export default Dashboard;
