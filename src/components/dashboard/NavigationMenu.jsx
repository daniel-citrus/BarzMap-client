import { useEffect, useRef, useState } from 'react';

const STAGGER_MS = 50;
const DURATION_MS = 300;

const NavigationMenu = ({ isOpen, linkData }) => {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const closeTimer = useRef(null);

    useEffect(() => {
        clearTimeout(closeTimer.current);

        if (isOpen) {
            setMounted(true);
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
            const totalClose = (linkData.length - 1) * STAGGER_MS + DURATION_MS;
            closeTimer.current = setTimeout(() => setMounted(false), totalClose);
        }

        return () => clearTimeout(closeTimer.current);
    }, [isOpen, linkData.length]);

    if (!mounted) return null;

    return (
        <ul className='pointer-events-auto flex flex-col items-stretch gap-2'>
            {linkData.map((data, i) => {
                const openDelay = (linkData.length - 1 - i) * STAGGER_MS;
                const closeDelay = i * STAGGER_MS;
                return (
                    <li
                        key={data.id}
                        className='transition-all duration-300 ease-out'
                        style={{
                            transitionDelay: `${visible ? openDelay : closeDelay}ms`,
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateY(0)' : 'translateY(16px)',
                        }}
                    >
                        <button
                            onClick={() => data.action()}
                            className='flex h-12 w-auto min-w-[3rem] items-center justify-start gap-3 rounded-full bg-white pl-3 pr-4 text-slate-700 shadow-lg shadow-slate-900/15 transition-colors duration-200 active:bg-slate-100 sm:h-13 sm:pl-3.5 sm:pr-5 md:h-14 md:hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/40'
                            aria-label={data.title}
                        >
                            <span className='flex h-6 w-6 shrink-0 items-center justify-center sm:h-6 sm:w-6'>{data.icon}</span>
                            <span className='text-sm font-medium sm:text-base'>{data.title}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default NavigationMenu;
