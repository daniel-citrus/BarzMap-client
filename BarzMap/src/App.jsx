import Dashboard from './components/Dashboard';
import MapLibreProvider from './context/MapLibreProvider';

function App() {
    return (
        <MapLibreProvider>
            <div className='flex min-h-screen w-full flex-col'>
                <Dashboard />
            </div>
        </MapLibreProvider>
    );
}

export default App;
