import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const DesktopSidebar = ({ linkData, selectedView, onNavigate, expanded = true, onExpandedChange }) => {
    const [internalExpanded, setInternalExpanded] = useState(true);
    const [hoveredTooltip, setHoveredTooltip] = useState(null);
    const isExpanded = onExpandedChange != null ? expanded : internalExpanded;
    const setExpanded = onExpandedChange ?? setInternalExpanded;

    const handleMouseEnter = useCallback((e, title) => {
        if (isExpanded) return;

        const rect = e.currentTarget.getBoundingClientRect();
        setHoveredTooltip({ title, top: rect.top + rect.height / 2, left: rect.right });
    }, [isExpanded]);

    const handleMouseLeave = useCallback(() => {
        setHoveredTooltip(null);
    }, []);

    return (
        <aside
            className={`absolute left-0 top-0 z-20 hidden h-full flex-col border-r border-slate-200 bg-white shadow-sm transition-[width] duration-200 lg:flex ${isExpanded ? 'w-56' : 'w-16'}`}
        >
            <div className={`flex flex-1 flex-col gap-1 overflow-hidden p-4 ${!isExpanded ? 'items-center' : ''}`}>
                <div className={`mb-3 flex flex-col items-center gap-2 px-0 ${isExpanded ? 'px-3' : ''}`}>
                    <img
                        src='/BarzMap Logo.png'
                        alt='BarzMap'
                        className='h-20 w-20  shrink-0 rounded-lg object-contain'
                    />
                    <span className={`text-base font-semibold tracking-tight text-slate-800 ${isExpanded ? '' : 'hidden'}`}>
                        BarzMap
                    </span>
                </div>
                {linkData.map((data) => {
                    const isActive = selectedView === data.id;
                    return (
                        <div key={data.id}>
                            <button
                                onClick={() => onNavigate(data.id)}
                                onMouseEnter={(e) => handleMouseEnter(e, data.title)}
                                onMouseLeave={handleMouseLeave}
                                title={!isExpanded ? data.title : undefined}
                                className={`flex w-full items-center text-left text-sm font-medium transition-colors ${isExpanded ? 'min-h-10 gap-3 rounded-lg py-2.5 px-3' : 'h-10 w-10 justify-center rounded-lg p-0'
                                    } ${isActive
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40`}
                            >
                                <span
                                    className={`flex shrink-0 items-center justify-center overflow-hidden [&_svg]:h-6 [&_svg]:w-6 [&_svg]:shrink-0 ${isExpanded
                                        ? 'h-6 w-6 min-h-6 min-w-6'
                                        : 'aspect-square h-10 w-10 min-h-10 min-w-10 rounded-md p-2'
                                        } ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}
                                >
                                    {data.icon}
                                </span>
                                <span className={isExpanded ? '' : 'hidden'}>{data.title}</span>
                            </button>
                        </div>
                    );
                })}
            </div>
            <button
                type='button'
                onClick={() => setExpanded(!isExpanded)}
                className='flex items-center justify-end p-2 text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40'
                aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className={`h-4 w-4 transition-transform ${isExpanded ? '' : 'rotate-180'}`}
                >
                    <path d='M15 18l-6-6 6-6' />
                </svg>
            </button>

            {hoveredTooltip &&
                createPortal(
                    <>
                        <style>{`
                            @keyframes sidebar-tooltip-slide-in {
                                from {
                                    opacity: 0;
                                    transform: translate(-10px, -50%);
                                }
                                to {
                                    opacity: 1;
                                    transform: translate(0, -50%);
                                }
                            }
                        `}</style>
                        <div
                            className='pointer-events-none fixed z-[100] ml-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-lg'
                            style={{
                                left: hoveredTooltip.left,
                                top: hoveredTooltip.top,
                                animation: 'sidebar-tooltip-slide-in 0.2s ease-out forwards',
                            }}
                            aria-hidden
                        >
                            {hoveredTooltip.title}
                        </div>
                    </>,
                    document.body
                )}
        </aside>
    );
};

export default DesktopSidebar;
