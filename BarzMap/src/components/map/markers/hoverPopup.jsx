const HoverPopup = ({ title, address, distance, thumbnail }) => {
    return (
        <div className='flex w-64 max-w-xs gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5'>
            <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100'>
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={title || 'Location thumbnail'}
                        className='h-full w-full object-cover'
                    />
                ) : (
                    <div className='flex h-full w-full items-center justify-center text-xs font-semibold text-slate-400'>
                        No Image
                    </div>
                )}
            </div>
            <div className='flex min-w-0 flex-1 flex-col justify-center gap-1'>
                {title && (
                    <p className='truncate text-sm font-semibold text-slate-900'>{
                        title
                    }</p>
                )}
                {address && (
                    <p className='truncate text-xs text-slate-600'>{address}</p>
                )}
                {distance && (
                    <p className='text-xs font-medium text-indigo-600'>{distance}</p>
                )}
            </div>
        </div>
    );
};

export default HoverPopup;
