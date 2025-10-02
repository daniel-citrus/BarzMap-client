import { useMemo, useState } from 'react';

const DetailedPopup = ({
    title,
    images = [],
    address,
    distance,
    equipments = [],
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const hasImages = images.length > 0;

    const clampedIndex = useMemo(() => {
        if (!hasImages) {
            return 0;
        }
        return Math.min(activeIndex, images.length - 1);
    }, [activeIndex, hasImages, images.length]);

    const activeImage = hasImages ? images[clampedIndex] : null;

    const handlePrev = () => {
        if (!hasImages) {
            return;
        }
        setActiveIndex((index) =>
            index === 0 ? images.length - 1 : index - 1
        );
    };

    const handleNext = () => {
        if (!hasImages) {
            return;
        }
        setActiveIndex((index) => (index + 1) % images.length);
    };

    const handleSelect = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className='flex w-80 max-w-sm flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5'>
            {hasImages ? (
                <div className='flex flex-col gap-3'>
                    <div className='relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-slate-100'>
                        <img
                            src={activeImage}
                            alt={`${title || 'Location'} photo ${clampedIndex + 1}`}
                            className='h-full w-full object-cover'
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    type='button'
                                    onClick={handlePrev}
                                    className='absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow'
                                >
                                    ‹
                                </button>
                                <button
                                    type='button'
                                    onClick={handleNext}
                                    className='absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow'
                                >
                                    ›
                                </button>
                            </>
                        )}
                    </div>
                    {images.length > 1 && (
                        <div className='grid grid-cols-4 gap-2'>
                            {images.map((image, index) => (
                                <button
                                    type='button'
                                    key={image + index}
                                    onClick={() => handleSelect(index)}
                                    className={`flex h-12 items-center justify-center overflow-hidden rounded-lg border ${
                                        index === clampedIndex
                                            ? 'border-indigo-500 ring-2 ring-indigo-500'
                                            : 'border-transparent'
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${title || 'Location'} thumbnail ${index + 1}`}
                                        className='h-full w-full object-cover'
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className='flex h-40 items-center justify-center rounded-xl bg-slate-100 text-sm font-medium text-slate-500'>
                    No images available
                </div>
            )}

            <div className='flex flex-col gap-2'>
                {title && (
                    <h3 className='text-lg font-semibold text-slate-900'>{title}</h3>
                )}
                {(address || distance) && (
                    <div className='flex flex-col gap-1 text-sm text-slate-600'>
                        {address && <p className='leading-snug'>{address}</p>}
                        {distance && (
                            <p className='font-medium text-indigo-600'>{distance}</p>
                        )}
                    </div>
                )}
            </div>

            {equipments.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                    {equipments.map((item) => (
                        <span
                            key={item}
                            className='rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700'
                        >
                            {item}
                        </span>
                    ))}
                </div>
            ) : (
                <p className='text-xs text-slate-400'>No equipment details provided.</p>
            )}
        </div>
    );
};

export default DetailedPopup;
