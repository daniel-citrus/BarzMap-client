import Dashboard from './features/dashboard/Dashboard';
import { MapLibreProvider } from './context/MapLibreContext';
import ParkSubmissionForm from './features/parkSubmission/components/ParkSubmissionForm';
import ParkSubmissionDashboard from './features/parkSubmission/ParkSubmissionDashboard';
import ParkSubmissionViewer from './features/parkSubmission/components/ParkSubmissionViewer';

function App() {
    return (
        <div className='flex min-h-screen w-full flex-col'>
            {/* <MapLibreProvider>
                <Dashboard />
            </MapLibreProvider> */}
            {/* <ParkSubmissionForm /> */}
            <ParkSubmissionDashboard />
            {/* <ParkSubmissionViewer /> */}
        </div>
    );
}

export default App;
