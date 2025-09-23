import Dashboard from './components/Dashboard';

function App() {
    return (
        <div
            className='flex min-h-screen w-full flex-col'
            style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}
        >
            <Dashboard />
        </div>
    );
}

export default App;
