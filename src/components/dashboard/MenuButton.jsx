import { useMemo } from 'react';

const MenuButton = ({ menuOpen, toggleMenu, className = '' }) => {
    const onToggle = () => {
        toggleMenu();
    };

    const { topBar, middleBar, bottomBar } = useMemo(() => {
        const baseBar =
            'block h-[2.5px] w-6 origin-center rounded-full bg-current transition-all duration-300 ease-in-out sm:h-[3px] sm:w-7 md:w-8';

        return {
            topBar: `${baseBar} ${
                menuOpen ? 'translate-y-[6.5px] rotate-45 sm:translate-y-[8px]' : ''
            }`,
            middleBar: `${baseBar} ${
                menuOpen ? 'opacity-0 scale-x-50' : 'opacity-100'
            }`,
            bottomBar: `${baseBar} ${
                menuOpen ? '-translate-y-[6.5px] -rotate-45 sm:-translate-y-[8px]' : ''
            }`,
        };
    }, [menuOpen]);

    return (
        <button
            type='button'
            onClick={onToggle}
            className={`inline-flex h-12 w-12 flex-col items-center justify-center gap-[4px] rounded-full bg-white text-gray-800 shadow-lg shadow-slate-900/15 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600/40 focus-visible:ring-offset-2 sm:h-13 sm:w-13 sm:gap-[5px] md:h-14 md:w-14 ${className}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
        >
            <span className={topBar} />
            <span className={middleBar} />
            <span className={bottomBar} />
        </button>
    );
};

export default MenuButton;
