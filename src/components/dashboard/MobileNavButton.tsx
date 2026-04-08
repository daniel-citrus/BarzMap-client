import type { ReactNode } from 'react';

interface MobileNavButtonProps {
    title: string;
    icon: ReactNode;
    onClick: () => void;
}

const MobileNavButton = ({ title, icon, onClick }: MobileNavButtonProps) => (
    <button
        type='button'
        onClick={onClick}
        className='flex h-12 w-auto min-w-[3rem] items-center justify-start gap-3 rounded-full bg-white pl-3 pr-4 text-slate-700 shadow-lg shadow-slate-900/15 transition-colors duration-200 active:bg-slate-100 sm:h-13 sm:pl-3.5 sm:pr-5 md:h-14 md:hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/40'
        aria-label={title}
    >
        <span className='flex h-6 w-6 shrink-0 items-center justify-center sm:h-6 sm:w-6'>{icon}</span>
        <span className='text-sm font-medium sm:text-base'>{title}</span>
    </button>
);

export default MobileNavButton;
