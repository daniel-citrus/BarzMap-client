import { useMemo } from 'react';

const SAMPLE_PARKS = Object.freeze({
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                name: 'Eastshore Park',
                equipment: ['Pull Up Bars', 'Dip Bars'],
                address: '2930 Grand Ave, Oakland, CA 94610',
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
                address: '1524 1st Ave, Oakland, CA 94606',
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
                address:
                    '1333 8th Street, Alameda, California 94501, United States',
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
        {
            type: 'Feature',
            properties: {
                name: 'Barras Paralelas',
                address:
                    'Calle niza y av.chapultepec 276, Av Chapultepec 282, Roma Nte., Cuauhtémoc, 06700 Ciudad de México, CDMX, Mexico',
                equipment: [
                    'Dip Bars',
                    'Pull Up Bars',
                    'Ab Bench',
                    'Machine Press',
                    'Ladder',
                    'Flipping Tire',
                    'Climbing Rope',
                    'Ab Machine',
                    'Gymnastics Rings',
                ],
            },
            geometry: {
                type: 'Point',
                coordinates: [-99.161944,19.424023],
            },
        },
    ],
});

const useSampleParkData = () => {
    const parks = useMemo(() => SAMPLE_PARKS, []);

    return { parks };
};

export default useSampleParkData;
