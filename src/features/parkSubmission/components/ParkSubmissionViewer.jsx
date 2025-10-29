import { useEffect, useMemo, useState } from 'react';

import ParkSubmissionModeration from './ParkSubmissionModeration.jsx';

const formatDateTime = (value) =>
    value
        ? new Intl.DateTimeFormat('en-US', {
              timeZone: 'UTC',
              month: 'long',
              day: '2-digit',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
          }).format(new Date(value))
        : null;

const ParkSubmissionViewer = ({
    submission,
    onClose,
    onApprove,
    onDeny,
    onPending,
    onCommentChange,
}) => {
    const {
        title,
        parkName,
        description,
        parkDescription,
        parkAddress,
        address,
        equipment = [],
        images = [],
        submittedAt,
        date,
        user,
        submitter,
        moderationComment,
        status,
    } = submission ?? {};

    const [activeIndex, setActiveIndex] = useState(0);
    const hasImages = images.length > 0;
    const [failedImages, setFailedImages] = useState({});

    useEffect(() => {
        setActiveIndex(0);
        setFailedImages({});
    }, [images]);

    const clampedIndex = useMemo(() => {
        if (!hasImages) {
            return 0;
        }

        return Math.min(activeIndex, images.length - 1);
    }, [activeIndex, hasImages, images.length]);

    const resolvedTitle = title ?? parkName ?? 'Untitled Submission';
    const resolvedDescription =
        description ?? parkDescription ?? 'No description provided.';
    const resolvedAddress = address ?? parkAddress;
    const resolvedSubmitter = submitter ?? user;
    const resolvedSubmittedAt = submittedAt ?? date;
    const resolvedStatus = status
        ? status.charAt(0).toUpperCase() + status.slice(1)
        : null;
    const equipmentCount = equipment.length;

    const activeImage = hasImages ? images[clampedIndex] : null;
    const isActiveImageFailed = activeImage ? failedImages[activeImage] : false;

    const handleImageError = (imageUrl) => {
        if (!imageUrl) {
            return;
        }

        setFailedImages((prev) => {
            if (prev[imageUrl]) {
                return prev;
            }

            return {
                ...prev,
                [imageUrl]: true,
            };
        });
    };

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

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose?.();
        }
    };

    const submissionInfoEntries = [
        {
            label: 'Images',
            value: images.length
                ? `${images.length} image${images.length === 1 ? '' : 's'}`
                : 'No images provided',
        },
    ];

    return (
        <div
            onClick={handleBackdropClick}
            className='detailedPopupBackdrop fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm'
        >
            <div className='relative flex h-[90vh] w-[90vw] max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/10'>
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700'
                    aria-label='Close submission viewer'
                >
                    ×
                </button>

                <div className='grid h-full grid-cols-1 gap-0 md:grid-cols-[1.2fr_1fr]'>
                    <div className='flex flex-col overflow-hidden border-slate-100 bg-slate-900 text-white'>
                        <div className='relative flex min-h-[50%] flex-1 flex-col'>
                            {hasImages ? (
                                <div className='relative flex h-[260px] w-full items-center justify-center overflow-hidden bg-slate-900/60 sm:h-[320px] md:h-full'>
                                    {!isActiveImageFailed ? (
                                        <img
                                            src={activeImage}
                                            alt={`${
                                                resolvedTitle || 'Park submission'
                                            } photo ${clampedIndex + 1}`}
                                            onError={() => handleImageError(activeImage)}
                                            className='h-full w-full object-cover'
                                        />
                                    ) : (
                                        <div className='flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-900/80 px-6 text-center text-sm font-medium text-slate-200'>
                                            <span>Image unavailable</span>
                                            <span className='text-xs text-slate-400'>Try another photo from the carousel.</span>
                                        </div>
                                    )}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                type='button'
                                                onClick={handlePrev}
                                                className='absolute left-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40'
                                                aria-label='View previous image'
                                            >
                                                ‹
                                            </button>
                                            <button
                                                type='button'
                                                onClick={handleNext}
                                                className='absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40'
                                                aria-label='View next image'
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
                                                        index === clampedIndex
                                                            ? 'bg-white'
                                                            : 'bg-white/40'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className='flex h-[260px] w-full items-center justify-center bg-slate-900/40 text-sm font-medium text-slate-200 sm:h-[320px] md:h-full'>
                                    No images available
                                </div>
                            )}

                            {images.length > 1 && (
                                <div className='flex gap-2 overflow-x-auto border-t border-slate-800 bg-slate-900/60 px-4 py-3 md:grid md:auto-rows-[minmax(3.5rem,auto)] md:grid-cols-4 md:place-items-center md:gap-2.5 md:overflow-visible md:px-5 lg:grid-cols-5'>
                                    {images.map((image, index) => (
                                        <button
                                            key={`${image}-${index}`}
                                            type='button'
                                            onClick={() => handleSelect(index)}
                                            className={`relative h-16 w-20 overflow-hidden rounded-lg transition md:h-16 md:w-20 ${
                                                index === clampedIndex
                                                    ? 'ring-2 ring-white'
                                                    : 'ring-1 ring-transparent hover:ring-white/50'
                                            }`}
                                        >
                                            {failedImages[image] ? (
                                                <div className='flex h-full w-full items-center justify-center bg-slate-800 text-[0.65rem] font-medium uppercase tracking-wide text-slate-300'>
                                                    Unavailable
                                                </div>
                                            ) : (
                                                <img
                                                    src={image}
                                                    alt={`${
                                                        resolvedTitle ||
                                                        'Park submission'
                                                    } thumbnail ${index + 1}`}
                                                    onError={() => handleImageError(image)}
                                                    className='h-full w-full object-cover'
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col overflow-y-auto bg-white px-8 pb-8 pt-8 md:pt-20'>
                        <div className='flex flex-col gap-3 border-b border-slate-200 pb-6'>
                            <h2 className='text-2xl font-semibold text-slate-900'>
                                {resolvedTitle}
                            </h2>
                            <div className='flex flex-col gap-1 text-sm uppercase tracking-wide text-slate-400'>
                                {resolvedSubmittedAt && (
                                    <span>{formatDateTime(resolvedSubmittedAt)}</span>
                                )}
                                {resolvedSubmitter && (
                                    <span>Submitted by {resolvedSubmitter}</span>
                                )}
                            </div>
                            {resolvedStatus && (
                                <span className='self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600'>
                                    {resolvedStatus}
                                </span>
                            )}
                        </div>

                        <div className='mt-6 flex flex-col gap-6'>
                            <div className='space-y-2'>
                                <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                    Park Details
                                </h3>
                                <p className='text-sm leading-relaxed text-slate-600'>
                                    {resolvedDescription}
                                </p>
                            </div>

                            {resolvedAddress && (
                                <div className='space-y-2'>
                                    <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                        Address
                                    </h3>
                                    <p className='text-sm text-slate-600'>
                                        {resolvedAddress}
                                    </p>
                                </div>
                            )}

                            {submissionInfoEntries.length > 0 && (
                                <div className='space-y-2'>
                                    <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                        Submission Info
                                    </h3>
                                    <dl className='grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2'>
                                        {submissionInfoEntries.map(({ label, value }) => (
                                            <div key={label} className='flex flex-col gap-1 rounded-lg border border-slate-200 bg-slate-50/60 p-3'>
                                                <dt className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                                                    {label}
                                                </dt>
                                                <dd className='text-sm text-slate-700'>{value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            )}

                            <div className='space-y-2'>
                                <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                    Moderation Comment
                                </h3>
                                <div className='rounded-lg border border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-700'>
                                    {moderationComment || 'No moderation comment yet.'}
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                    Equipment
                                    <span className='ml-2 text-xs font-semibold text-slate-400'>
                                        {equipmentCount}
                                    </span>
                                </h3>
                                {equipment.length ? (
                                    <ul className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
                                        {equipment.map((item) => (
                                            <li
                                                key={item}
                                                className='flex h-12 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 px-3 text-center text-sm font-medium text-indigo-600 shadow-sm shadow-indigo-100/60'
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className='text-sm text-slate-400'>
                                        No equipment details provided.
                                    </p>
                                )}
                            </div>

                            <ParkSubmissionModeration
                                onApprove={onApprove}
                                onDeny={onDeny}
                                onPending={onPending}
                                onCommentChange={onCommentChange}
                                initialComment={moderationComment}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParkSubmissionViewer;
