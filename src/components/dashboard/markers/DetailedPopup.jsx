import { useMemo, useState, useEffect } from 'react';

const DetailedPopup = ({
    isAdmin = true,
    title = '',
    address = '',
    admin_notes = '',
    approved_at = '',
    approved_by = '',
    city = '',
    country = '',
    created_at = '',
    description = '',
    id = '',
    latitude = '',
    longitude = '',
    name = '',
    postal_code = '',
    state = '',
    status = '',
    submit_date = '',
    submitted_by = '',
    updated_at = '',
    onClose,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState([])
    const [equipments, setEquipments] = useState([])
    const hasImages = images.length > 0;

    const clampedIndex = useMemo(() => {
        if (!hasImages) {
            return 0;
        }
        return Math.min(activeIndex, images.length - 1);
    }, [activeIndex, hasImages, images.length]);

    const activeImage = useMemo(() => {
        return hasImages && images[clampedIndex] ? images[clampedIndex] : null;
    }, [hasImages, images, clampedIndex]);

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

    /* Get park images */
    useEffect(() => {
        if (!id) {
            return;
        }

        const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';
        const url = `${baseUrl}/api/authenticated/images/park/${id}`;

        const fetchImages = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`);
                }

                const parkImages = await response.json();
                setImages(Array.isArray(parkImages) ? parkImages : []);
            }
            catch (error) {
                console.error('There was a problem fetching park images.', error)
            }
        };

        fetchImages();
    }, [id])

    /* Get equipment */

    return (
        <div
            onClick={onBackdropClick}
            className='detailedPopupBackdrop fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm'
        >
            <div className='relative flex h-[90vh] w-[90vw] max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/10'>
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700'
                >
                    ×
                </button>

                <div className='grid h-full grid-cols-1 gap-0 md:grid-cols-[1.2fr_1fr]'>
                    <div className='flex flex-col overflow-hidden border-slate-100 bg-slate-900 text-white'>
                        <div className='relative flex min-h-[50%] flex-1 flex-col'>
                            {hasImages ? (
                                <>
                                    <div className='relative flex h-full items-center justify-center overflow-hidden bg-slate-900/60'>
                                        {activeImage && (
                                            <img
                                                src={activeImage.image_url}
                                                alt={activeImage.alt_text || `${title || 'Location'} photo ${clampedIndex + 1}`}
                                                className='h-full w-full object-cover'
                                            />
                                        )}
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
                                                        className={`h-1.5 w-8 rounded-full transition ${index ===
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
                                                    key={image.id}
                                                    onClick={() =>
                                                        handleSelect(index)
                                                    }
                                                    className={`flex h-20 items-center justify-center overflow-hidden rounded-xl border ${index === clampedIndex
                                                        ? 'border-white ring-2 ring-white/80'
                                                        : 'border-white/0'
                                                        }`}
                                                >
                                                    <img
                                                        src={image.thumbnail_url || image.image_url}
                                                        alt={image.alt_text || `${title || 'Location'} thumbnail ${index + 1}`}
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

                    <div className='flex flex-col overflow-y-auto bg-white px-8 pb-8 pt-8 md:pt-20'>
                        <div className='flex flex-col gap-3 border-b border-slate-200 pb-6'>
                            {(title || name) && (
                                <h2 className='text-2xl font-semibold text-slate-900'>
                                    {title || name}
                                </h2>
                            )}
                            {status && (
                                <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                    status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                        status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                                            'bg-slate-100 text-slate-700'
                                    }`}>
                                    {status}
                                </span>
                            )}
                            {address && (
                                <div className='flex flex-col gap-1 text-base text-slate-600'>
                                    <p className='leading-relaxed'>{address}</p>
                                    {(city || state || postal_code) && (
                                        <p className='text-sm text-slate-500'>
                                            {[city, state, postal_code].filter(Boolean).join(', ')}
                                            {country && country !== 'USA' && `, ${country}`}
                                        </p>
                                    )}
                                </div>
                            )}
                            {(latitude && longitude) && (
                                <p className='text-xs text-slate-400'>
                                    Coordinates: {latitude}, {longitude}
                                </p>
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

                        {equipments.length > 0 && (
                            <div className='mt-6 flex flex-col gap-3'>
                                <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                    Equipment
                                </h3>
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
                            </div>
                        )}

                        {isAdmin && (
                            <div className='mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6'>
                                <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                    Admin Information
                                </h3>

                                {admin_notes && (
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                            Admin Notes
                                        </span>
                                        <p className='text-sm leading-relaxed text-slate-600'>
                                            {admin_notes}
                                        </p>
                                    </div>
                                )}

                                {approved_at && (
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                            Approved At
                                        </span>
                                        <p className='text-sm text-slate-600'>
                                            {new Date(approved_at).toLocaleString()}
                                        </p>
                                    </div>
                                )}

                                {approved_by && (
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                            Approved By
                                        </span>
                                        <p className='text-sm text-slate-600'>
                                            {approved_by}
                                        </p>
                                    </div>
                                )}

                                {submitted_by && (
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                            Submitted By
                                        </span>
                                        <p className='text-sm text-slate-600'>
                                            {submitted_by}
                                        </p>
                                    </div>
                                )}

                                {submit_date && (
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                            Submit Date
                                        </span>
                                        <p className='text-sm text-slate-600'>
                                            {new Date(submit_date).toLocaleString()}
                                        </p>
                                    </div>
                                )}

                                {created_at && (
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                            Created At
                                        </span>
                                        <p className='text-sm text-slate-600'>
                                            {new Date(created_at).toLocaleString()}
                                        </p>
                                    </div>
                                )}

                                {updated_at && (
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                            Updated At
                                        </span>
                                        <p className='text-sm text-slate-600'>
                                            {new Date(updated_at).toLocaleString()}
                                        </p>
                                    </div>
                                )}

                                {id && (
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                            Park ID
                                        </span>
                                        <p className='text-xs font-mono text-slate-500'>
                                            {id}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedPopup;
