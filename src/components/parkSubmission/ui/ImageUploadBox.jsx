const ImageUploadBox = ({
    isRequired = false,
    onImagesChange,
    selectedImages,
}) => {
    const handleImageChange = async (event) => {
        const files = Array.from(event.target.files ?? []);
        if (!files.length) {
            event.target.value = '';
            return;
        }

        const newImages = await Promise.all(
            files.map(
                (file, index) =>
                    new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            resolve({
                                id: `${file.name}-${file.lastModified
                                    }-${Date.now()}-${index}`,
                                preview: e.target?.result ?? '',
                                file: file,
                            });
                        };
                        reader.readAsDataURL(file);
                    })
            )
        );

        onImagesChange((prev) => [
            ...prev,
            ...newImages.filter((image) => image.preview),
        ]);

        event.target.value = '';
    };

    const handleRemoveImage = (id) => {
        onImagesChange((prev) => prev.filter((image) => image.id !== id));
    };

    return (
        <section className='space-y-4'>
            <h2 className='text-lg font-semibold text-slate-900'>
                Park Images
                {isRequired && <span className='text-rose-500'> *</span>}
            </h2>
            <p className='text-sm text-slate-500'>
                Showcase the park with standout photos. Click or drag and drop
                to upload.
            </p>
            <div className='rounded-2xl border border-slate-200 bg-slate-50/70 p-6'>
                {selectedImages.length ? (
                    <div className='flex w-full flex-col gap-4'>
                        <div className='grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
                            {selectedImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className='relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'
                                >
                                    <img
                                        src={image.preview}
                                        alt={`Park preview ${index + 1}`}
                                        className='h-full w-full object-cover'
                                    />
                                    <button
                                        type='button'
                                        className='absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-white shadow-lg transition hover:bg-indigo-600 cursor-pointer'
                                        onClick={() =>
                                            handleRemoveImage(image.id)
                                        }
                                        aria-label={`Remove park preview ${index + 1
                                            }`}
                                    >
                                        <svg
                                            aria-hidden='true'
                                            viewBox='0 0 20 20'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-4 w-4'
                                        >
                                            <path
                                                d='m6 6 8 8M14 6l-8 8'
                                                stroke='currentColor'
                                                strokeWidth='1.6'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            <label
                                htmlFor='park-image'
                                className='flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white text-center text-slate-500 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-500'
                            >
                                <span className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 shadow-inner shadow-slate-200'>
                                    <svg
                                        aria-hidden='true'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 w-5'
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
                                <span className='text-xs font-medium uppercase tracking-wide'>
                                    Add Photo
                                </span>
                                <input
                                    id='park-image'
                                    name='images'
                                    type='file'
                                    accept='image/*'
                                    multiple
                                    className='hidden'
                                    required={
                                        isRequired && !selectedImages.length
                                    }
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <p className='text-xs font-medium uppercase tracking-wide text-indigo-500'>
                            {selectedImages.length} photo
                            {selectedImages.length > 1 ? 's' : ''} selected
                        </p>
                    </div>
                ) : (
                    <label
                        htmlFor='park-image'
                        className='group relative flex min-h-[13rem] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50'
                    >
                        <span className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 shadow-inner shadow-slate-200'>
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
                        <div className='space-y-1 text-center'>
                            <p className='text-base font-medium text-slate-700'>
                                Add park photos
                            </p>
                            <p className='text-xs text-slate-500'>
                                JPEG, PNG up to 10 MB each
                            </p>
                        </div>
                        <span className='rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-500 shadow-sm'>
                            Upload
                        </span>
                        <p className='text-xs text-slate-400'>
                            Select multiple photos to showcase different angles.
                        </p>
                        <input
                            id='park-image'
                            name='images'
                            type='file'
                            accept='image/*'
                            multiple
                            className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                            required={isRequired}
                            onChange={handleImageChange}
                        />
                    </label>
                )}
            </div>
        </section>
    );
};

export default ImageUploadBox;
