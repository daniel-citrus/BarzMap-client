import { useCallback } from 'react';
import useSampleParkData from '../useSampleParkData';

const useMapHelpers = () => {
    const { parks } = useSampleParkData();

    const getFeaturesWithinBounds = useCallback(
        (northEast, southWest) => {
            // this will be very different when pulling from the backend, for now, filtering logic will remain here.
            const features = parks.features.filter((feature) => {
                const long = feature.geometry.coordinates[0];
                const lati = feature.geometry.coordinates[1];
                const isInside =
                    long <= northEast.lng &&
                    long >= southWest.lng &&
                    lati >= southWest.lat &&
                    lati <= northEast.lat;

                return isInside;
            });

            return features;
        },
        [parks]
    );

    return { getFeaturesWithinBounds };
};

export default useMapHelpers;
