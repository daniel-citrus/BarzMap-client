import { useState } from 'react';

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.35rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '999px',
    backgroundColor: '#ffffff',
    maxWidth: '360px',
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)',
};

const inputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '0.95rem',
    color: '#111827',
};

const buttonStyle = {
    border: 'none',
    borderRadius: '999px',
    cursor: 'pointer',
    padding: '0.25rem 0.75rem',
    fontSize: '0.85rem',
    backgroundColor: '#f3f4f6',
    color: '#374151',
};

const SearchInput = ({ placeholder = 'Search...', onSearch }) => {
    const [value, setValue] = useState('');

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
        <form style={containerStyle} onSubmit={handleSubmit}>
            <input
                type='search'
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                style={inputStyle}
                aria-label={placeholder}
                autoComplete='off'
            />
            {value && (
                <button type='button' style={buttonStyle} onClick={handleClear}>
                    Clear
                </button>
            )}
            <button type='submit' style={buttonStyle}>
                Search
            </button>
        </form>
    );
};

export default SearchInput;
