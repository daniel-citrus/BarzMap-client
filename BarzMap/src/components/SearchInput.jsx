import { useEffect, useMemo, useState } from 'react';

const SearchInput = ({
    searchValue = '',
    placeholder = 'Search... ',
    onSearch,
    className,
    inputClassName,
}) => {
    const [value, setValue] = useState('');

    const containerClass = useMemo(
        () =>
            [
                'group flex w-full items-center gap-2 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/95 px-3 py-2.5 shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur transition-all hover:shadow-xl focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100 focus-within:ring-offset-2 focus-within:ring-offset-white sm:gap-3 sm:px-5 sm:py-3',
                className,
            ]
                .filter(Boolean)
                .join(' '),
        [className],
    );

    const inputClass = useMemo(
        () =>
            [
                'flex-1 bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-base',
                inputClassName,
            ]
                .filter(Boolean)
                .join(' '),
        [inputClassName],
    );

    useEffect(() => {
        setValue(searchValue);
    }, [searchValue]);

    const handleChange = (event) => {
        const nextValue = event.target.value;
        setValue(nextValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleClear = () => {
        setValue('');
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <form className={containerClass} onSubmit={handleSubmit} role='search'>
            <span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 shadow-inner transition group-hover:bg-slate-200 group-focus-within:bg-indigo-100 group-focus-within:text-indigo-500 sm:h-11 sm:w-11'>
                <svg
                    aria-hidden='true'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                >
                    <path
                        d='M8.5 3.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm6.4 8.9 2.6 2.6'
                        stroke='currentColor'
                        strokeWidth='1.6'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            </span>
            <input
                type='search'
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={inputClass}
                aria-label={placeholder}
                autoComplete='off'
            />
            <div className='flex items-center gap-1.5 sm:gap-2'>
                {value && (
                    <button
                        type='button'
                        className='inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 text-xs font-medium text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-white hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 sm:gap-2 sm:text-sm'
                        onClick={handleClear}
                        aria-label='Clear search'
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
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                        <span className='hidden sm:inline'>Clear</span>
                    </button>
                )}
                <button
                    type='submit'
                    className='inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:gap-2 sm:px-5 sm:text-base'
                >
                    <svg
                        aria-hidden='true'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                    >
                        <path
                            d='m9 13 4-3-4-3v6Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M4 10h1m2 0h1m2 0h1'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                    <span>Search</span>
                </button>
            </div>
        </form>
    );
};

export default SearchInput;
