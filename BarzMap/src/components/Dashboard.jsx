import MapLibreMap from './MapLibre';
import SearchInput from './SearchInput';
import useUserAddress from '../hooks/useUserAddress';

const Dashboard = () => {
    const { address } = useUserAddress();

    return (
        <div className='relative h-screen w-full overflow-hidden bg-slate-100'>
            <SearchInput
                searchValue={address}
                className='absolute inset-x-0 top-3 z-30 w-full sm:left-1/2 sm:right-auto sm:top-6 sm:max-w-3xl sm:-translate-x-1/2'
            />
            <MapLibreMap className='h-full w-full' />
        </div>
    );
};

export default Dashboard;
