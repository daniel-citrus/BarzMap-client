import MapLibreMap from './MapLibre';
import SearchInput from './SearchInput';
import useUserAddress from '../hooks/useUserAddress';

const Dashboard = () => {
    const { address, attribution } = useUserAddress();

    return (
        <>
            <SearchInput/>
            <MapLibreMap />
        </>
    );
};

export default Dashboard;
