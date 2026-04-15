import type { ReactNode } from 'react';

interface PopupWrapperProps {
    onClose: () => void;
    fullHeight?: boolean;
    children: ReactNode;
}

const panelBaseClass =
    'relative m-4 flex w-[calc(100%-2rem)] max-w-2xl flex-col overflow-y-auto rounded-2xl bg-slate-100 shadow-xl sm:m-6 sm:w-[calc(100%-3rem)]';

const PopupWrapper = ({ onClose, fullHeight = true, children }: PopupWrapperProps) => {

    const panelClass = fullHeight
        ? `${panelBaseClass} min-h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] sm:max-h-[calc(100vh-3rem)]`
        : `${panelBaseClass} h-fit max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)]`;

    return (
        <div className='relative z-10 flex h-full w-full items-start justify-center'>
            <div
                className='absolute inset-0 bg-black/30 backdrop-blur-xs'
                onClick={onClose}
            />
            <div className={panelClass}>
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/80 text-slate-500 transition-colors hover:bg-slate-300 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/40 sm:right-4 sm:top-4'
                    aria-label='Close'
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default PopupWrapper;
