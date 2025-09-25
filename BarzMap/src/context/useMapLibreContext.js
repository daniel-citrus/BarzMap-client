import { useContext } from 'react';
import MapLibreContext from './MapLibreContext';

const useMapLibreContext = () => {
    const context = useContext(MapLibreContext);

    if (!context) {
        throw new Error('useMapLibreContext must be used inside a MapLibreProvider.');
    }

    return context;
};

export default useMapLibreContext;
