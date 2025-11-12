import Dashboard from './components/dashboard/Dashboard';
import { MapLibreProvider } from './context/MapLibreContext';

function App() {
    return (
        <div className='flex min-h-screen w-full flex-col'>
            <MapLibreProvider>
                <Dashboard />
            </MapLibreProvider>
        </div>
    );
}

export default App;
