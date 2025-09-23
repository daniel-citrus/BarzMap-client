import { useMemo } from 'react';

const SAMPLE_PARKS = Object.freeze({
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                name: 'Eastshore Park',
                equipment: ['Pull Up Bars', 'Dip Bars'],
            },
            geometry: {
                type: 'Point',
                coordinates: [-122.24892, 37.80975],
            },
        },
        {
            type: 'Feature',
            properties: {
                name: 'Pittman Green',
                equipment: ['Dip Bars'],
            },
            geometry: {
                type: 'Point',
                coordinates: [-122.25581, 37.80006],
            },
        },
        {
            type: 'Feature',
            properties: {
                name: 'Washington Park',
                equipment: [
                    'Dip Bars',
                    'Pull Up Bars',
                    'Ab Bench',
                    'Machine Press',
                ],
            },
            geometry: {
                type: 'Point',
                coordinates: [-122.27397, 37.76972],
            },
        },
    ],
});

const useSampleParkData = () => {
    const parks = useMemo(() => SAMPLE_PARKS, []);

    return { parks };
};

export default useSampleParkData;
