import { useMemo, useState, useEffect } from 'react';

interface ParkImage {
    id?: number;
    image_url?: string;
    thumbnail_url?: string;
    alt_text?: string;
}

// Helper: Get status badge styling
const getStatusStyles = (status: string): string => {
    const styles: Record<string, string> = {
        approved: 'bg-emerald-100 text-emerald-700',
        pending: 'bg-amber-100 text-amber-700',
        rejected: 'bg-rose-100 text-rose-700',
    };
    return styles[status] ?? 'bg-slate-100 text-slate-700';
};

// Helper: Format date for display
const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString();
};

// Helper: Get image identifier for error tracking
const getImageId = (image: ParkImage): string | number => {
    return image.id ?? image.image_url ?? image.thumbnail_url ?? '';
};

// Helper: Get image alt text
const getImageAlt = (image: ParkImage, fallbackTitle: string | undefined, index: number, isThumbnail = false): string => {
    return image.alt_text ?? `${fallbackTitle ?? 'Location'} ${isThumbnail ? 'thumbnail' : 'photo'} ${index + 1}`;
};

// Component: Image Gallery
interface ImageGalleryProps {
    images: ParkImage[];
    activeIndex: number;
    onSelect: (index: number) => void;
    onPrev: () => void;
    onNext: () => void;
    failedImages: Set<string | number>;
    title: string;
    onImageError: (imageId: string | number) => void;
}

const ImageGallery = ({ images, activeIndex, onSelect, onPrev, onNext, failedImages, title, onImageError }: ImageGalleryProps) => {
    const hasImages = images.length > 0;
    const hasMultipleImages = images.length > 1;
    const activeImage = hasImages ? images[activeIndex] : null;
    const isImageFailed = activeImage && failedImages.has(getImageId(activeImage));

    if (!hasImages) {
        return (
            <div className='flex h-full items-center justify-center bg-slate-900/40 text-sm font-medium text-slate-200'>
                No images available
            </div>
        );
    }

    return (
        <>
            {/* Main Image Display */}
            <div className='relative flex h-full items-center justify-center overflow-hidden bg-slate-900/60'>
                {activeImage && (
                    <>
                        {isImageFailed ? (
                            <div className='absolute inset-0 flex h-full w-full items-center justify-center px-8 text-center text-sm font-medium text-slate-200'>
                                {getImageAlt(activeImage, title, activeIndex + 1)}
                            </div>
                        ) : (
                            <img
                                src={activeImage.image_url}
                                alt=""
                                className='h-full w-full object-cover'
                                style={{ font: '0/0 a', color: 'transparent' }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    onImageError(getImageId(activeImage));
                                }}
                                onLoad={(e) => {
                                    e.currentTarget.setAttribute('aria-label', getImageAlt(activeImage, title, activeIndex + 1));
                                }}
                            />
                        )}
                    </>
                )}

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                    <>
                        <button
                            type='button'
                            onClick={onPrev}
                            className='absolute left-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40'
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            type='button'
                            onClick={onNext}
                            className='absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40'
                            aria-label="Next image"
                        >
                            ›
                        </button>
                    </>
                )}

                {/* Image Indicators */}
                {hasMultipleImages && (
                    <div className='absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2'>
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`h-1.5 w-8 rounded-full transition ${index === activeIndex ? 'bg-white' : 'bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Thumbnail Grid */}
            {hasMultipleImages && (
                <div className='grid grid-cols-4 gap-2 bg-slate-950/40 p-6'>
                    {images.map((image, index) => {
                        const imageId = getImageId(image);
                        const isThumbnailFailed = failedImages.has(imageId);
                        const isActive = index === activeIndex;

                        return (
                            <button
                                type='button'
                                key={String(imageId)}
                                onClick={() => onSelect(index)}
                                className={`relative flex h-20 items-center justify-center overflow-hidden rounded-xl border ${isActive ? 'border-white ring-2 ring-white/80' : 'border-white/0'
                                    }`}
                            >
                                {isThumbnailFailed ? (
                                    <div className='absolute inset-0 flex h-full w-full items-center justify-center px-2 text-center text-xs font-medium text-slate-200'>
                                        {getImageAlt(image, title, index + 1, true)}
                                    </div>
                                ) : (
                                    <img
                                        src={image.thumbnail_url ?? image.image_url}
                                        alt=""
                                        className='h-full w-full object-cover'
                                        style={{ font: '0/0 a', color: 'transparent' }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            onImageError(getImageId(image));
                                        }}
                                        onLoad={(e) => {
                                            e.currentTarget.setAttribute('aria-label', getImageAlt(image, title, index + 1, true));
                                        }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </>
    );
};

// Component: Admin Info Field
interface AdminInfoFieldProps {
    label: string;
    value: string | undefined;
    isDate?: boolean;
}

const AdminInfoField = ({ label, value, isDate = false }: AdminInfoFieldProps) => {
    if (!value) return null;

    return (
        <div className='flex flex-col gap-1'>
            <span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                {label}
            </span>
            <p className={isDate ? 'text-sm text-slate-600' : 'text-sm leading-relaxed text-slate-600'}>
                {isDate ? formatDate(value) : value}
            </p>
        </div>
    );
};

// Component: Admin Information Section
interface AdminInformationProps {
    isAdmin: boolean;
    admin_notes?: string;
    approved_at?: string | null;
    approved_by?: string | null;
    submitted_by?: string;
    submit_date?: string;
    created_at?: string;
    updated_at?: string;
    id?: number | string;
}

const AdminInformation = ({ isAdmin, admin_notes, approved_at, approved_by, submitted_by, submit_date, created_at, updated_at, id }: AdminInformationProps) => {
    if (!isAdmin) return null;

    return (
        <div className='mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6'>
            <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                Admin Information
            </h3>

            <AdminInfoField label="Admin Notes" value={admin_notes} />
            <AdminInfoField label="Approved At" value={approved_at ?? undefined} isDate />
            <AdminInfoField label="Approved By" value={approved_by ?? undefined} />
            <AdminInfoField label="Submitted By" value={submitted_by} />
            <AdminInfoField label="Submit Date" value={submit_date} isDate />
            <AdminInfoField label="Created At" value={created_at} isDate />
            <AdminInfoField label="Updated At" value={updated_at} isDate />

            {id != null && (
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
    );
};

export interface DetailedPopupProps {
    isAdmin?: boolean;
    title?: string;
    address?: string;
    admin_notes?: string;
    approved_at?: string | null;
    approved_by?: string | null;
    city?: string;
    country?: string;
    created_at?: string;
    description?: string;
    id?: number;
    latitude?: number;
    longitude?: number;
    name?: string;
    postal_code?: string;
    state?: string;
    status?: string;
    submit_date?: string;
    submitted_by?: string;
    updated_at?: string;
    onClose: () => void;
}

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
    id = undefined,
    latitude,
    longitude,
    name = '',
    postal_code = '',
    state = '',
    status = '',
    submit_date = '',
    submitted_by = '',
    updated_at = '',
    onClose,
}: DetailedPopupProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState<ParkImage[]>([]);
    const [failedImages, setFailedImages] = useState<Set<string | number>>(new Set());

    const displayTitle = title || name;
    const hasImages = images.length > 0;
    const clampedIndex = useMemo(() => {
        return hasImages ? Math.min(activeIndex, images.length - 1) : 0;
    }, [activeIndex, hasImages, images.length]);

    // Image navigation handlers
    const handlePrev = () => {
        if (!hasImages) return;
        setActiveIndex((index) => (index === 0 ? images.length - 1 : index - 1));
    };

    const handleNext = () => {
        if (!hasImages) return;
        setActiveIndex((index) => (index + 1) % images.length);
    };

    const handleSelect = (index: number) => {
        setActiveIndex(index);
    };

    const handleImageError = (imageId: string | number) => {
        setFailedImages((prev) => new Set(prev).add(imageId));
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    // Format address components
    const addressComponents = [city, state, postal_code].filter(Boolean);
    const fullAddress = addressComponents.length > 0
        ? `${addressComponents.join(', ')}${country && country !== 'USA' ? `, ${country}` : ''}`
        : null;

    // Fetch park images
    useEffect(() => {
        if (id == null) return;

        const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';
        const url = `${baseUrl}/api/images/park/${id}`;

        const fetchImages = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`);
                }

                const parkImages = await response.json();
                setImages(Array.isArray(parkImages) ? parkImages : []);
                setFailedImages(new Set());
                setActiveIndex(0); // Reset to first image when new images load
            } catch (error) {
                console.error('Error fetching park images:', error);
                setImages([]);
            }
        };

        fetchImages();
    }, [id]);


    return (
        <div
            onClick={handleBackdropClick}
            className='detailedPopupBackdrop fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm'
        >
            <div className='relative flex h-[90vh] w-[90vw] max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/10'>
                {/* Close Button */}
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700'
                    aria-label="Close popup"
                >
                    ×
                </button>

                <div className='grid h-full grid-cols-1 gap-0 md:grid-cols-[1.2fr_1fr]'>
                    {/* Image Gallery Section */}
                    <div className='flex flex-col overflow-hidden border-slate-100 bg-slate-900 text-white'>
                        <div className='relative flex min-h-[50%] flex-1 flex-col'>
                            <ImageGallery
                                images={images}
                                activeIndex={clampedIndex}
                                onSelect={handleSelect}
                                onPrev={handlePrev}
                                onNext={handleNext}
                                failedImages={failedImages}
                                title={displayTitle}
                                onImageError={handleImageError}
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className='flex flex-col overflow-y-auto bg-white px-8 pb-8 pt-8 md:pt-20'>
                        {/* Header Information */}
                        <div className='flex flex-col gap-3 border-b border-slate-200 pb-6'>
                            {displayTitle && (
                                <h2 className='text-2xl font-semibold text-slate-900'>
                                    {displayTitle}
                                </h2>
                            )}

                            {status && (
                                <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyles(status)}`}>
                                    {status}
                                </span>
                            )}

                            {address && (
                                <div className='flex flex-col gap-1 text-base text-slate-600'>
                                    <p className='leading-relaxed'>{address}</p>
                                    {fullAddress && (
                                        <p className='text-sm text-slate-500'>
                                            {fullAddress}
                                        </p>
                                    )}
                                </div>
                            )}

                            {latitude != null && longitude != null && (
                                <p className='text-xs text-slate-400'>
                                    Coordinates: {latitude}, {longitude}
                                </p>
                            )}
                        </div>

                        {/* Description */}
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

                        {/* Admin Information */}
                        <AdminInformation
                            isAdmin={isAdmin}
                            admin_notes={admin_notes}
                            approved_at={approved_at}
                            approved_by={approved_by}
                            submitted_by={submitted_by}
                            submit_date={submit_date}
                            created_at={created_at}
                            updated_at={updated_at}
                            id={id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedPopup;
