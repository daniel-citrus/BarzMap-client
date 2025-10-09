import Dashboard from './components/Dashboard';
import { MapLibreProvider } from './context/MapLibreContext';
import ParkSubmissionForm from './components/ParkSubmissionForm';

function App() {
    return (
        <MapLibreProvider>
            {/* <div className='flex min-h-screen w-full flex-col'>
                <Dashboard />
            </div> */}
            <ParkSubmissionForm />
        </MapLibreProvider>
    );
}

export default App;
