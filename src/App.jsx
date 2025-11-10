import Dashboard from './components/dashboard/Dashboard';
import { MapLibreProvider } from './context/MapLibreContext';
import ParkSubmissionForm from './components/parkSubmission/ParkSubmissionForm';
import ParkSubmissionDashboard from './components/parkSubmission/ParkSubmissionDashboard';
import EventsBoard from './components/events/EventsBoard';

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
