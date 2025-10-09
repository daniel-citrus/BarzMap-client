import { useState } from 'react';

const EQUIPMENT_OPTIONS = [
    'Playground',
    'Picnic Tables',
    'Restrooms',
    'Sports Fields',
    'Parking',
    'Dog Park',
    'Walking Trails',
];

const ParkSubmissionForm = ({ onSubmit }) => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) {
            setImagePreview(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target?.result ?? null);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (onSubmit) {
            const formData = new FormData(event.currentTarget);
            onSubmit(formData);
        }
    };

    return (
        <form
            className='mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/10'
            onSubmit={handleSubmit}
        >
            <section className='space-y-4'>
                <h2 className='text-lg font-semibold text-slate-900'>Park Images</h2>
                <p className='text-sm text-slate-500'>
                    Showcase the park with a high-quality photo. Click or drag and drop to upload.
                </p>
                <label
                    htmlFor='park-image'
                    className='group relative flex h-52 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50'
                >
                    {imagePreview ? (
                        <div className='relative h-full w-full overflow-hidden rounded-lg'>
                            <img
                                src={imagePreview}
                                alt='Park preview'
                                className='h-full w-full object-cover'
                            />
                            <div className='absolute inset-0 flex items-center justify-center bg-slate-900/50 opacity-0 transition group-hover:opacity-100'>
                                <span className='rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-indigo-600'>
                                    Change Photo
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center gap-3 text-slate-500'>
                            <span className='flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-inner shadow-slate-200'>
                                <svg
                                    aria-hidden='true'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6 text-indigo-500'
                                >
                                    <path
                                        d='M12 5v14m-7-7h14'
                                        stroke='currentColor'
                                        strokeWidth='1.8'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </span>
                            <div className='space-y-1'>
                                <p className='text-base font-medium text-slate-700'>Add park photos</p>
                                <p className='text-xs text-slate-500'>JPEG, PNG up to 10 MB</p>
                            </div>
                            <span className='rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-500 shadow-sm'>
                                Upload
                            </span>
                        </div>
                    )}
                    <input
                        id='park-image'
                        name='image'
                        type='file'
                        accept='image/*'
                        className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                        onChange={handleImageChange}
                    />
                </label>
            </section>

            <section className='grid gap-4'>
                <label className='grid gap-2'>
                    <span className='text-sm font-medium text-slate-700'>Title</span>
                    <input
                        type='text'
                        name='title'
                        placeholder='Enter park name'
                        className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                        required
                    />
                </label>
            </section>

            <section className='space-y-4'>
                <div className='text-sm font-medium text-slate-700'>Address</div>
                <div className='grid gap-4'>
                    <label className='grid gap-2'>
                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>Street Address</span>
                        <input
                            type='text'
                            name='address'
                            placeholder='123 Park Ave'
                            className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                            required
                        />
                    </label>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <label className='grid gap-2'>
                            <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>City</span>
                            <input
                                type='text'
                                name='city'
                                placeholder='City'
                                className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                                required
                            />
                        </label>
                        <label className='grid gap-2'>
                            <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>State</span>
                            <input
                                type='text'
                                name='state'
                                placeholder='State / Province'
                                className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                                required
                            />
                        </label>
                    </div>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <label className='grid gap-2'>
                            <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>Country</span>
                            <input
                                type='text'
                                name='country'
                                placeholder='Country'
                                className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                                required
                            />
                        </label>
                        <label className='grid gap-2'>
                            <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>Postal Code</span>
                            <input
                                type='text'
                                name='postalCode'
                                placeholder='Postal Code'
                                className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                                required
                            />
                        </label>
                    </div>
                </div>
            </section>

            <section className='space-y-4'>
                <h2 className='text-sm font-medium text-slate-700'>Equipment</h2>
                <div className='grid gap-3 sm:grid-cols-2'>
                    {EQUIPMENT_OPTIONS.map((option) => (
                        <label
                            key={option}
                            className='flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-white'
                        >
                            <input
                                type='checkbox'
                                name='equipment'
                                value={option}
                                className='mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            </section>

            <section className='grid gap-2'>
                <label className='space-y-2'>
                    <span className='text-sm font-medium text-slate-700'>Description</span>
                    <textarea
                        name='description'
                        placeholder='Share details about the park, amenities, and anything visitors should know.'
                        rows={5}
                        className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                        required
                    />
                </label>
            </section>

            <div className='flex justify-end'>
                <button
                    type='submit'
                    className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                >
                    Submit Park
                </button>
            </div>
        </form>
    );
};

export default ParkSubmissionForm;
