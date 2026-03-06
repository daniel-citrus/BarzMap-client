import MapLibreMap from './MapLibreMap';
import SearchInput from './SearchInput';
import useClientAddress from '../../hooks/useClientAddress';
import { useCallback, useEffect, useState } from 'react';
import { useMapLibreContext } from '../../context/MapLibreContext';
import useMapMarkers from '../../hooks/MapLibre Hooks/useMapMarkers';
import ParkSubmissionForm from '../parkSubmission/form/ParkSubmissionForm';
import EventsBoard from '../events/EventsBoard';
import ParkSubmissionDashboard from '../parkSubmission/dashboard/ParkSubmissionDashboard';
import DetailedPopup from './markers/DetailedPopup';
import MenuButton from './MenuButton';
import NavigationMenu from './NavigationMenu';
import DesktopSidebar from './DesktopSidebar';
import PopupWrapper from './PopupWrapper';

const Dashboard = () => {
    const { address, setAddress, coordinates } = useClientAddress();
    const { mapInstance } = useMapLibreContext();
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedView, setSelectedView] = useState('dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    const onNavSelect = (viewId) => {
        setSelectedView(viewId);
        setMenuOpen(false);
    };

    const navLinks = [
        {
            id: 'dashboard', title: 'Map', action: () => onNavSelect('dashboard'),
            icon: (
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' className='h-6 w-6'>
                    <polygon points='1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6' />
                    <line x1='8' y1='2' x2='8' y2='18' /><line x1='16' y1='6' x2='16' y2='22' />
                </svg>
            ),
        },
        {
            id: 'parkSubmission', title: 'Submit a Park', action: () => onNavSelect('parkSubmission'),
            icon: (
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' className='h-6 w-6'>
                    <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z' />
                    <line x1='12' y1='7' x2='12' y2='11' /><line x1='10' y1='9' x2='14' y2='9' />
                </svg>
            ),
        },
        {
            id: 'events', title: 'Events', action: () => onNavSelect('events'),
            icon: (
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' className='h-6 w-6'>
                    <path d='M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9' /><path d='M13.73 21a2 2 0 0 1-3.46 0' />
                    <path d='M2 8c0-3.31 2.69-6 6-6' /><path d='M22 8c0-3.31-2.69-6-6-6' />
                </svg>
            ),
        },
        {
            id: 'submissionDashboard', title: 'Submission Dashboard', action: () => onNavSelect('submissionDashboard'),
            icon: (
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' className='h-6 w-6'>
                    <path d='M9 11l3 3L22 4' /><path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' />
                </svg>
            ),
        },
    ];

    const onDetailedPopupOpen = useCallback((data) => {
        setSelectedMarker(data);
    }, []);

    useMapMarkers({ onMarkerOpen: onDetailedPopupOpen });

    // Recenter map when coordinates are updated (for initial loads and async updates)
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

        // Always animate map to coordinates when search is clicked (even if same address)
        if (mapInstance.current && coordinates) {
            mapInstance.current.flyTo({
                center: [coordinates.longitude, coordinates.latitude],
                zoom: 14,
            });
        }
    };

    return (
        <div className='relative flex h-full w-full overflow-hidden bg-slate-100 pb-[env(safe-area-inset-bottom)]'>
            {/* Main content area - full width */}
            <div className='relative flex flex-1 flex-col overflow-hidden'>
                {/* Map container - always mounted */}
                <div className='absolute inset-0 z-0 h-full w-full'>
                    <div className='relative h-full w-full overflow-hidden bg-slate-100'>
                        <div
                            className={`pointer-events-none absolute top-3 z-30 flex items-center justify-center gap-3 transition-[left] duration-200 left-3 right-3 sm:left-6 sm:right-6 sm:top-6 lg:right-6 ${
                                sidebarExpanded ? 'lg:left-56' : 'lg:left-16'
                            }`}
                        >
                            <SearchInput
                                searchValue={address}
                                onSearch={onNewAddress}
                                className='pointer-events-auto w-full sm:max-w-3xl'
                            />
                        </div>
                        <div className='h-full w-full'>
                            <MapLibreMap />
                        </div>
                        {/* Mobile nav - hamburger + floating menu, hidden on desktop */}
                        <div className='pointer-events-none absolute bottom-6 left-4 z-30 flex flex-col items-start gap-3 sm:bottom-8 sm:left-6 lg:hidden'>
                            <NavigationMenu
                                isOpen={menuOpen}
                                linkData={navLinks.filter((l) => l.id !== 'dashboard')}
                            />
                            <MenuButton
                                menuOpen={menuOpen}
                                toggleMenu={() => setMenuOpen((prev) => !prev)}
                                className='pointer-events-auto'
                            />
                        </div>
                    </div>
                </div>

                {/* Other views - rendered on top when selected */}
                {selectedView === 'parkSubmission' && (
                    <PopupWrapper onClose={() => setSelectedView('dashboard')}>
                        <ParkSubmissionForm />
                    </PopupWrapper>
                )}
                {selectedView === 'events' && (
                    <PopupWrapper onClose={() => setSelectedView('dashboard')}>
                        <EventsBoard
                            lat={coordinates?.latitude}
                            lng={coordinates?.longitude}
                        />
                    </PopupWrapper>
                )}
                {selectedView === 'submissionDashboard' && (
                    <PopupWrapper onClose={() => setSelectedView('dashboard')}>
                        <ParkSubmissionDashboard />
                    </PopupWrapper>
                )}
            </div>

            {/* Desktop sidebar - overlays map on lg and up */}
            <DesktopSidebar
                linkData={navLinks}
                selectedView={selectedView}
                onNavigate={onNavSelect}
                expanded={sidebarExpanded}
                onExpandedChange={setSidebarExpanded}
            />

            {/* Detailed Popup */}
            {selectedMarker && (
                <DetailedPopup
                    isAdmin={true}
                    title={selectedMarker.name}
                    name={selectedMarker.name}
                    description={selectedMarker.description}
                    address={selectedMarker.address}
                    city={selectedMarker.city}
                    state={selectedMarker.state}
                    country={selectedMarker.country}
                    postal_code={selectedMarker.postal_code}
                    latitude={selectedMarker.latitude}
                    longitude={selectedMarker.longitude}
                    status={selectedMarker.status}
                    admin_notes={selectedMarker.admin_notes}
                    approved_at={selectedMarker.approved_at}
                    approved_by={selectedMarker.approved_by}
                    created_at={selectedMarker.created_at}
                    id={selectedMarker.id}
                    submit_date={selectedMarker.submit_date}
                    submitted_by={selectedMarker.submitted_by}
                    updated_at={selectedMarker.updated_at}
                    onClose={() => setSelectedMarker(null)}
                />
            )}
        </div>
    );

};

export default Dashboard;
