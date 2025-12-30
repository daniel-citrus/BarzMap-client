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


const Dashboard = () => {
    const { address, setAddress, coordinates } = useClientAddress();
    const { mapInstance } = useMapLibreContext();
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedView, setSelectedView] = useState('dashboard');

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

    const handleFormSubmit = (formData) => {
        console.log('Form submitted:', formData);
        // Handle form submission logic here
    };

    const views = [
        { id: 'dashboard', label: 'Dashboard', icon: '🗺️' },
        { id: 'parkSubmission', label: 'Park Submission', icon: '➕' },
        { id: 'events', label: 'Events Board', icon: '📅' },
        { id: 'submissionDashboard', label: 'Submissions', icon: '📋' },
    ];

    return (
        <div className='flex h-screen w-full flex-col overflow-hidden bg-slate-100'>
            {/* View Selector Toolbar */}
            <div className='flex items-center gap-2 border-b border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur-md sm:p-4'>
                <h2 className='mr-2 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:mr-4 sm:text-sm'>
                    View Selector
                </h2>
                <div className='flex flex-1 gap-2'>
                    {views.map((view) => (
                        <button
                            key={view.id}
                            onClick={() => setSelectedView(view.id)}
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${selectedView === view.id
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600'
                                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40`}
                        >
                            <span className='text-sm sm:text-base'>
                                {view.icon}
                            </span>
                            <span>{view.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected View Content */}
            <div className='relative flex flex-1 flex-col overflow-hidden'>
                {/* Map container - always mounted, shown/hidden based on view */}
                <div
                    className={`absolute inset-0 h-full w-full ${selectedView === 'dashboard'
                        ? 'z-0 opacity-100'
                        : 'pointer-events-none -z-10 opacity-0'
                        }`}
                >
                    <div className='relative h-full w-full overflow-hidden bg-slate-100'>
                        <div className='pointer-events-none absolute left-3 right-3 top-3 z-30 flex items-center gap-3 sm:left-6 sm:right-6 sm:top-6'>
                            <SearchInput
                                searchValue={address}
                                onSearch={onNewAddress}
                                className='pointer-events-auto w-full sm:max-w-3xl'
                            />
                        </div>
                        <div className='h-full w-full'>
                            <MapLibreMap />
                        </div>
                    </div>
                </div>

                {/* Other views - rendered on top when selected */}
                {selectedView === 'parkSubmission' && (
                    <div className='relative z-10 h-full w-full overflow-y-auto bg-slate-100 py-8'>
                        <ParkSubmissionForm onSubmit={handleFormSubmit} />
                    </div>
                )}
                {selectedView === 'events' && (
                    <div className='relative z-10 h-full w-full overflow-y-auto bg-slate-100'>
                        <EventsBoard
                            lat={coordinates?.latitude}
                            lng={coordinates?.longitude}
                        />
                    </div>
                )}
                {selectedView === 'submissionDashboard' && (
                    <div className='relative z-10 h-full w-full overflow-y-auto bg-slate-100'>
                        <ParkSubmissionDashboard />
                    </div>
                )}
            </div>

            {/* Detailed Popup */}
            {selectedMarker && (
                <DetailedPopup
                    isAdmin={false}
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
                    equipments={selectedMarker.equipment || []}
                    images={[]}
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
