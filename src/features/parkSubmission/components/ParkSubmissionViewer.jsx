import { useMemo } from 'react';
import PropTypes from 'prop-types';

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

const ParkSubmissionViewer = ({ submission, onClose }) => {
    const {
        title,
        description,
        address,
        equipment = [],
        images = [],
        submittedAt,
        submitter,
    } = submission;

    const primaryImage = useMemo(() => images?.[0] ?? null, [images]);

    return (
        <div className='fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 bg-slate-950/70 backdrop-blur-sm sm:px-6'>
            <div className='relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/10'>
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700'
                    aria-label='Close submission viewer'
                >
                    ×
                </button>

                <div className='grid h-full grid-cols-1 gap-0 md:grid-cols-[1.4fr_1fr]'>
                    <section className='flex flex-col overflow-hidden border-r border-slate-100 bg-slate-900 text-white'>
                        <div className='relative flex-1'>
                            {primaryImage ? (
                                <img
                                    src={primaryImage}
                                    alt={title || 'Park preview'}
                                    className='h-full w-full object-cover'
                                />
                            ) : (
                                <div className='flex h-full items-center justify-center bg-slate-900/60 text-sm font-semibold text-slate-200'>
                                    No images provided
                                </div>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className='flex gap-2 overflow-x-auto border-t border-slate-800 bg-slate-900/60 px-4 py-3'>
                                {images.map((image, index) => (
                                    <img
                                        key={`${image}-${index}`}
                                        src={image}
                                        alt={`${title || 'Park'} thumbnail ${
                                            index + 1
                                        }`}
                                        className='h-16 w-20 rounded-lg object-cover'
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    <section className='flex flex-col overflow-y-auto px-6 py-8 sm:px-8'>
                        <div className='flex flex-col gap-2 border-b border-slate-200 pb-6'>
                            <h2 className='text-2xl font-semibold text-slate-900'>
                                {title || 'Untitled Submission'}
                            </h2>
                            <div className='flex flex-col gap-1 text-xs uppercase tracking-wide text-slate-400 sm:flex-row sm:items-center sm:gap-3'>
                                {submittedAt && (
                                    <span>{formatDateTime(submittedAt)}</span>
                                )}
                                {submitter && (
                                    <span>Submitted by {submitter}</span>
                                )}
                            </div>
                        </div>

                        <div className='mt-6 flex flex-col gap-4'>
                            <div className='space-y-2'>
                                <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                    Park Details
                                </h3>
                                <p className='text-sm leading-relaxed text-slate-600'>
                                    {description || 'No description provided.'}
                                </p>
                            </div>

                            {address && (
                                <div className='space-y-2'>
                                    <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                        Address
                                    </h3>
                                    <p className='text-sm text-slate-600'>
                                        {address}
                                    </p>
                                </div>
                            )}

                            <div className='space-y-2'>
                                <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                                    Equipment
                                </h3>
                                {equipment.length ? (
                                    <div className='flex flex-wrap gap-2'>
                                        {equipment.map((item) => (
                                            <span
                                                key={item}
                                                className='rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 shadow-sm'
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className='text-sm text-slate-400'>
                                        No equipment listed.
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

ParkSubmissionViewer.propTypes = {
    submission: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        address: PropTypes.string,
        equipment: PropTypes.arrayOf(PropTypes.string),
        images: PropTypes.arrayOf(PropTypes.string),
        submittedAt: PropTypes.string,
        submitter: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ParkSubmissionViewer;
