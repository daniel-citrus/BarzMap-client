import Dashboard from './components/dashboard/Dashboard';
import { MapLibreProvider } from './context/MapLibreContext';

function App() {
    return (
        <div className='flex h-full min-h-[100dvh] w-full flex-col'>
            <MapLibreProvider>
                <Dashboard />
            </MapLibreProvider>
        </div>
    );
}

export default App;
