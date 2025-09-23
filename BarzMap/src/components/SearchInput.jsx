import { useEffect, useState } from 'react';

const containerBaseClass = 'search-input flex w-full items-center gap-2';
const inputBaseClass =
    'search-input__field flex-1 min-w-0 rounded-full border border-gray-300 px-3 py-2 text-base leading-6 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100';
const searchButtonBaseClass =
    'search-input__submit rounded-full border border-gray-900 bg-gray-900 px-3 py-2 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60';
const clearButtonBaseClass =
    'search-input__clear rounded-full border border-gray-900 bg-white px-3 py-2 font-semibold text-gray-900 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60';

const SearchInput = ({
    value,
    defaultValue = '',
    placeholder = 'Search...',
    onChange,
    onSearch,
    onClear,
    disabled = false,
    autoFocus = false,
    className,
    inputClassName,
    searchButtonClassName,
    clearButtonClassName,
    searchButtonLabel = 'Search',
    clearButtonLabel = 'Clear',
    showSearchButton = true,
    showClearButton = true,
    inputProps,
}) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(() => defaultValue);

    useEffect(() => {
        if (!isControlled) {
            setInternalValue(defaultValue);
        }
    }, [defaultValue, isControlled]);

    const currentValue = isControlled ? value : internalValue;
    const hasValue = currentValue !== undefined && currentValue !== null && String(currentValue).length > 0;

    const normalizedInputProps = { ...(inputProps || {}) };
    delete normalizedInputProps.value;
    delete normalizedInputProps.defaultValue;
    delete normalizedInputProps.onChange;
    delete normalizedInputProps.disabled;
    delete normalizedInputProps.autoFocus;
    delete normalizedInputProps.placeholder;

    const handleChange = (event) => {
        const nextValue = event.target.value;

        if (!isControlled) {
            setInternalValue(nextValue);
        }

        if (onChange) {
            onChange(nextValue, event);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (onSearch) {
            onSearch(currentValue, event);
        }
    };

    const handleClear = () => {
        if (!hasValue) {
            return;
        }

        if (!isControlled) {
            setInternalValue('');
        }

        if (onClear) {
            onClear();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && hasValue) {
            event.preventDefault();
            handleClear();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={[containerBaseClass, className].filter(Boolean).join(' ')}
            role='search'
        >
            <input
                type='search'
                value={currentValue}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                className={[inputBaseClass, inputClassName].filter(Boolean).join(' ')}
                onKeyDown={handleKeyDown}
                {...normalizedInputProps}
            />

            {showClearButton && (
                <button
                    type='button'
                    onClick={handleClear}
                    disabled={disabled || !hasValue}
                    className={[clearButtonBaseClass, clearButtonClassName].filter(Boolean).join(' ')}
                >
                    {clearButtonLabel}
                </button>
            )}

            {showSearchButton && (
                <button
                    type='submit'
                    disabled={disabled}
                    className={[searchButtonBaseClass, searchButtonClassName].filter(Boolean).join(' ')}
                >
                    {searchButtonLabel}
                </button>
            )}
        </form>
    );
};

export default SearchInput;
