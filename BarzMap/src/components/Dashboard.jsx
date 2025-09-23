import AddressModal from './AddressModal';
import MapLibreMap from './MapLibre';
import SearchInput from './SearchInput';

const Dashboard = () => {
    return (
        <>
            <AddressModal />
            <SearchInput />
            <MapLibreMap />
        </>
    );
};

export default Dashboard;
