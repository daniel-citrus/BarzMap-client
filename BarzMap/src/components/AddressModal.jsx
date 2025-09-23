import { useCallback, useEffect, useMemo, useState } from 'react';

const reverseGeocode = async (latitude, longitude) => {
    const searchParams = new URLSearchParams({
        format: 'jsonv2',
        lat: latitude,
        lon: longitude,
        addressdetails: '1',
    });

    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${searchParams.toString()}`, {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'BarzMapClient/1.0 (https://barzmap.example)',
        },
    });

    if (!response.ok) {
        throw new Error('Reverse geocoding request failed');
    }

    const data = await response.json();

    if (data && typeof data.display_name === 'string' && data.display_name.trim().length > 0) {
        return data.display_name.trim();
    }

    return '';
};

const getStoredAddress = () => {
    if (typeof window === 'undefined') {
        return '';
    }

    try {
        const stored = window.localStorage.getItem('lastKnownAddress');
        return stored ? stored.trim() : '';
    } catch (error) {
        console.error('Unable to read lastKnownAddress from localStorage', error);
        return '';
    }
};

const AddressModal = ({ isOpen = false, onClose, onSave }) => {
    const [address, setAddress] = useState(() => getStoredAddress());
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const modalLabelId = useMemo(() => `address-modal-title-${Math.random().toString(36).slice(2)}`, []);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        let isActive = true;
        const storedAddress = getStoredAddress();

        if (storedAddress) {
            setAddress(storedAddress);
            setErrorMessage('');
            return () => {
                isActive = false;
            };
        }

        if (typeof navigator === 'undefined' || !navigator.geolocation) {
            setErrorMessage('Location services are unavailable on this device.');
            return () => {
                isActive = false;
            };
        }

        setIsLoading(true);
        setErrorMessage('');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                if (!isActive) {
                    return;
                }

                try {
                    const resolvedAddress = await reverseGeocode(
                        position.coords.latitude,
                        position.coords.longitude,
                    );

                    if (!isActive) {
                        return;
                    }

                    if (resolvedAddress) {
                        setAddress(resolvedAddress);
                    }
                } catch (error) {
                    console.error('Failed to resolve address from coordinates', error);
                    if (isActive) {
                        setErrorMessage('We could not determine your address automatically.');
                    }
                } finally {
                    if (isActive) {
                        setIsLoading(false);
                    }
                }
            },
            (error) => {
                console.warn('Geolocation request was denied or failed', error);
                if (isActive) {
                    setIsLoading(false);
                    setErrorMessage('');
                }
            },
            {
                enableHighAccuracy: true,
                maximumAge: 300000,
                timeout: 15000,
            },
        );

        return () => {
            isActive = false;
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setAddress((current) => (current ? current : getStoredAddress()));
    }, [isOpen]);

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();

            const trimmed = address.trim();
            if (!trimmed) {
                setErrorMessage('Please enter your address.');
                return;
            }

            try {
                window.localStorage.setItem('lastKnownAddress', trimmed);
            } catch (error) {
                console.error('Unable to save lastKnownAddress to localStorage', error);
            }

            if (onSave) {
                onSave(trimmed);
            }

            if (onClose) {
                onClose();
            }
        },
        [address, onClose, onSave],
    );

    const handleAddressChange = useCallback((event) => {
        setAddress(event.target.value);
        if (errorMessage) {
            setErrorMessage('');
        }
    }, [errorMessage]);

    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className='address-modal fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
            <div
                role='dialog'
                aria-modal='true'
                aria-labelledby={modalLabelId}
                className='address-modal__panel w-full max-w-md rounded-lg bg-white p-6 shadow-2xl'
            >
                <div className='mb-4 flex items-start justify-between gap-4'>
                    <h2 id={modalLabelId} className='text-lg font-semibold text-gray-900'>
                        Confirm Your Address
                    </h2>
                    <button
                        type='button'
                        onClick={handleClose}
                        className='text-sm font-medium text-gray-500 transition hover:text-gray-700'
                        aria-label='Close address modal'
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <label className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
                        Address
                        <input
                            type='text'
                            value={address}
                            placeholder='Enter your address'
                            onChange={handleAddressChange}
                            className='rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-400'
                        />
                    </label>

                    {isLoading && (
                        <p className='text-sm text-gray-500'>Attempting to detect your location…</p>
                    )}

                    {errorMessage && !isLoading && (
                        <p className='text-sm text-red-600'>{errorMessage}</p>
                    )}

                    <div className='flex justify-end gap-2'>
                        <button
                            type='button'
                            onClick={handleClose}
                            className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800'
                        >
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressModal;
