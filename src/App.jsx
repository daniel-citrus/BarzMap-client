import Dashboard from './features/dashboard/Dashboard';
import { MapLibreProvider } from './context/MapLibreContext';
import ParkSubmissionForm from './features/parkSubmission/components/ParkSubmissionForm';
import ParkSubmissionDashboard from './features/parkSubmission/ParkSubmissionDashboard';
import EventsBoard from './features/events/EventsBoard';

function App() {
    return (
        <div className='flex min-h-screen w-full flex-col'>
            <MapLibreProvider>
                <Dashboard />
            </MapLibreProvider>
            {/* <ParkSubmissionForm /> */}
            {/* <ParkSubmissionDashboard /> */}
            {/* <EventsBoard /> */}
        </div>
    );
}

export default App;
