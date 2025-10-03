import { useMemo, useState } from 'react';

const DetailedPopup = ({
    title,
    images = [],
    address,
    distance,
    equipments = [],
    description,
    stats,
    onClose,
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

    const onBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return (
        <div
            onClick={onBackdropClick}
            className='detailedPopupBackdrop fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm'
        >
            <div className='relative flex h-[90vh] w-[90vw] max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/10'>
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700'
                >
                    ×
                </button>

                <div className='grid h-full grid-cols-1 gap-0 md:grid-cols-[1.2fr_1fr]'>
                    <div className='flex flex-col overflow-hidden border-r border-slate-100 bg-slate-900 text-white'>
                        <div className='relative flex min-h-[50%] flex-1 flex-col'>
                            {hasImages ? (
                                <>
                                    <div className='relative flex h-full items-center justify-center overflow-hidden bg-slate-900/60'>
                                        <img
                                            src={activeImage}
                                            alt={`${
                                                title || 'Location'
                                            } photo ${clampedIndex + 1}`}
                                            className='h-full w-full object-cover'
                                        />
                                        {images.length > 1 && (
                                            <>
                                                <button
                                                    type='button'
                                                    onClick={handlePrev}
                                                    className='absolute left-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40'
                                                >
                                                    ‹
                                                </button>
                                                <button
                                                    type='button'
                                                    onClick={handleNext}
                                                    className='absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40'
                                                >
                                                    ›
                                                </button>
                                            </>
                                        )}
                                        {images.length > 1 && (
                                            <div className='absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2'>
                                                {images.map((_, index) => (
                                                    <span
                                                        key={index}
                                                        className={`h-1.5 w-8 rounded-full transition ${
                                                            index ===
                                                            clampedIndex
                                                                ? 'bg-white'
                                                                : 'bg-white/40'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {images.length > 1 && (
                                        <div className='grid grid-cols-4 gap-2 bg-slate-950/40 p-6'>
                                            {images.map((image, index) => (
                                                <button
                                                    type='button'
                                                    key={image + index}
                                                    onClick={() =>
                                                        handleSelect(index)
                                                    }
                                                    className={`flex h-20 items-center justify-center overflow-hidden rounded-xl border ${
                                                        index === clampedIndex
                                                            ? 'border-white ring-2 ring-white/80'
                                                            : 'border-white/0'
                                                    }`}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`${
                                                            title || 'Location'
                                                        } thumbnail ${
                                                            index + 1
                                                        }`}
                                                        className='h-full w-full object-cover'
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className='flex h-full items-center justify-center bg-slate-900/40 text-sm font-medium text-slate-200'>
                                    No images available
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col overflow-y-auto bg-white p-8'>
                        <div className='flex flex-col gap-3 border-b border-slate-200 pb-6'>
                            {title && (
                                <h2 className='text-2xl font-semibold text-slate-900'>
                                    {title}
                                </h2>
                            )}
                            {(address || distance) && (
                                <div className='flex flex-col gap-1 text-base text-slate-600'>
                                    {address && (
                                        <p className='leading-relaxed'>
                                            {address}
                                        </p>
                                    )}
                                    {distance && (
                                        <p className='font-medium text-indigo-600'>
                                            {distance}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {description && (
                            <div className='mt-6 flex flex-col gap-2'>
                                <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                    About this spot
                                </h3>
                                <p className='text-sm leading-relaxed text-slate-600'>
                                    {description}
                                </p>
                            </div>
                        )}

                        {Array.isArray(stats) && stats.length > 0 && (
                            <div className='mt-8 grid grid-cols-2 gap-4'>
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className='rounded-2xl border border-slate-200 p-4'
                                    >
                                        <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                                            {stat.label}
                                        </p>
                                        <p className='mt-1 text-lg font-semibold text-slate-900'>
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className='mt-8 flex flex-col gap-3'>
                            <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                Equipment
                            </h3>
                            {equipments.length > 0 ? (
                                <div className='flex flex-wrap gap-2'>
                                    {equipments.map((item) => (
                                        <span
                                            key={item}
                                            className='rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600'
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-sm text-slate-400'>
                                    No equipment details provided.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedPopup;
