import MapLibreMap from './MapLibre';
import SearchInput from './SearchInput';
import useUserAddress from '../hooks/useUserAddress';

const Dashboard = () => {
    const { address } = useUserAddress();

    return (
        <div className='relative h-screen w-full overflow-hidden bg-slate-100'>
            <SearchInput searchValue={address} />
            <MapLibreMap />
        </div>
    );
};

export default Dashboard;
