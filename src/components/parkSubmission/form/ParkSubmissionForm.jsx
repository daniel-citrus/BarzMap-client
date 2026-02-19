import { useState } from 'react';
import ImageUploadBox from '../ui/ImageUploadBox';
import LocationSelector from '../ui/LocationSelector';
import EquipmentSelector from '../ui/EquipmentSelector';
import useParkSubmissionActions from '../../../hooks/useParkSubmissionActions';

const ParkSubmissionForm = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { submitPark } = useParkSubmissionActions();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const name = formData.get("title") || '';
        const description = formData.get("description") || '';
        const lat = formData.get("coordLat") || '';
        const lng = formData.get("coordLng") || '';
        const address = formData.get('address') || '';

        try {
            const result = await submitPark({
                name, description,
                latitude: lat,
                longitude: lng,
                address,
                images: selectedImages,
                equipment_ids: selectedEquipment,
            })
            console.log('Submission successful:', result);
        } catch (error) {
            console.error('Error submitting park:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className='mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/10'
            onSubmit={handleSubmit}
        >
            <p className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                <span className='text-rose-500'>*</span> Required
            </p>
            <ImageUploadBox
                isRequired
                onImagesChange={setSelectedImages}
                selectedImages={selectedImages}
            />
            <section className='space-y-4'>
                <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                    Park Details
                </h2>
                <label className='grid gap-2'>
                    <span className='text-sm font-medium text-slate-700'>
                        Title <span className='text-rose-500'>*</span>
                    </span>
                    <input
                        type='text'
                        name='title'
                        placeholder='Enter park name'
                        className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                        required
                    />
                </label>
            </section>

            <LocationSelector />

            <EquipmentSelector onEquipmentChange={setSelectedEquipment} />

            <section className='space-y-2'>
                <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                    Description
                </h2>
                <label className='space-y-2'>
                    <span className='text-sm font-medium text-slate-700'>
                        Park Overview
                    </span>
                    <textarea
                        name='description'
                        placeholder='Share details about the park, amenities, and anything visitors should know.'
                        rows={5}
                        className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                    />
                </label>
            </section>

            <div className='flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-5'>
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:w-auto cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
                >
                    {isSubmitting ? 'Submitting…' : 'Submit Park'}
                </button>
            </div>
        </form>
    );
};

export default ParkSubmissionForm;