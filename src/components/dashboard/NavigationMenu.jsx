const NavigationMenu = ({ onClose, linkData }) => {
    return (
        <div className='pointer-events-none fixed inset-y-0 left-0 z-40 flex w-full max-w-xs sm:max-w-sm lg:max-w-md'>
            <div className='pointer-events-auto relative flex h-full w-full flex-col gap-2 overflow-y-auto bg-white/90 p-6 text-slate-800 shadow-xl shadow-slate-900/20 backdrop-blur-md'>
                <h2 className='text-lg font-semibold tracking-tight text-slate-900'>
                    Navigate
                </h2>
                <ul className='flex flex-col gap-2'>
                    {linkData.map((data) => (
                        <li key={data.id}>
                            <button
                                onClick={data.action}
                                className='w-full rounded-lg border border-white/40 bg-white/80 px-4 py-3 text-left font-medium text-slate-700 shadow shadow-slate-900/10 transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/40'
                            >
                                {data.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                type='button'
                onClick={onClose}
                className='pointer-events-auto mt-4 self-start rounded-full border border-white/40 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow shadow-slate-900/15 transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/40'
            >
                &times;
            </button>
        </div>
    );
};

export default NavigationMenu;
