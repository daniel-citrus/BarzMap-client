import Dashboard from './components/dashboard/Dashboard';
import { MapLibreProvider } from './context/MapLibreContext';

function App() {
    return (
        <MapLibreProvider>
            <div className='flex h-full min-h-[100dvh] w-full flex-col'>
                <Dashboard />
            </div>
        </MapLibreProvider>
    );
}

export default App;
