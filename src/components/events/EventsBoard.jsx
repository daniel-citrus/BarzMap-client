import useParkEvents from '../../hooks/useParkEvents';

const EventsBoard = ({
    title = 'Upcoming Park Events',
    description = 'Discover nearby gatherings and activities curated around the parks you love.',
    events = [],
    lat,
    lng,
    radius = 10,
    limit = 20,
}) => {
    // Use the hook to fetch events if coordinates are provided, otherwise use empty options
    const { parkEvents, loading, error } = useParkEvents(
        lat !== undefined && lng !== undefined
            ? { lat, lng, radius, limit }
            : { limit }
    );

    // Priority: props events > fetched parkEvents
    const eventItems =
        events.length > 0
            ? events
            : parkEvents && parkEvents.length > 0
                ? parkEvents
                : [];

    return (
        <section className='mx-auto flex w-full max-w-6xl flex-col gap-6 p-6 sm:p-8'>
            <header className='flex flex-col gap-2 text-slate-900'>
                <h2 className='text-2xl font-semibold sm:text-3xl'>{title}</h2>
                {description && (
                    <p className='text-sm text-slate-500 sm:text-base'>
                        {description}
                    </p>
                )}
            </header>

            <div className='rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-6 sm:p-8'>
                {loading ? (
                    <div className='grid place-items-center rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500'>
                        <p>Loading events...</p>
                    </div>
                ) : error ? (
                    <div className='grid place-items-center rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500'>
                        <p className='text-rose-600'>
                            Error loading events. Please try again later.
                        </p>
                    </div>
                ) : eventItems && eventItems.length > 0 ? (
                    <ul className='flex flex-col gap-4 sm:gap-5'>
                        {eventItems.map(
                            ({
                                id,
                                parkName,
                                address,
                                distance,
                                date,
                                time,
                                description: eventDescription,
                                host,
                                ctaLabel = 'View event',
                            }) => (
                                <li
                                    key={id}
                                    className='flex w-full flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-900/10 sm:p-6'
                                >
                                    <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8'>
                                        <div className='flex flex-1 flex-col gap-3'>
                                            <div className='flex flex-col gap-1'>
                                                {(date || time) && (
                                                    <span className='text-xs font-semibold uppercase tracking-wide text-indigo-500'>
                                                        {date || 'Date TBA'}
                                                        {time ? ` • ${time}` : ''}
                                                    </span>
                                                )}
                                                <h3 className='text-lg font-semibold text-slate-900 sm:text-xl'>
                                                    {parkName}
                                                </h3>
                                            </div>
                                            <p className='text-sm text-slate-500'>{address}</p>
                                            {eventDescription && (
                                                <p className='text-sm leading-relaxed text-slate-600'>
                                                    {eventDescription}
                                                </p>
                                            )}
                                        </div>

                                        <aside className='flex w-full flex-col gap-3 text-sm text-slate-600 md:w-56'>
                                            <dl className='space-y-3'>
                                                <div className='flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2'>
                                                    <dt className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                                        Distance
                                                    </dt>
                                                    <dd className='inline-flex items-center gap-1 font-semibold text-slate-700'>
                                                        <svg
                                                            className='h-4 w-4 text-indigo-500'
                                                            viewBox='0 0 20 20'
                                                            fill='currentColor'
                                                            aria-hidden='true'
                                                        >
                                                            <path d='M10 2C6.686 2 4 4.701 4 8.036c0 4.72 4.904 9.33 5.114 9.52a1 1 0 0 0 1.372 0C11.696 17.366 16 13.062 16 8.036 16 4.701 13.314 2 10 2Zm0 12.54c-1.578-1.6-4-4.692-4-6.504C6 5.789 7.79 4 10 4s4 1.79 4 4.036c0 1.812-2.422 4.905-4 6.504ZM10 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z' />
                                                        </svg>
                                                        {distance}
                                                    </dd>
                                                </div>
                                                {host && (
                                                    <div className='flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2'>
                                                        <dt className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                                            Host
                                                        </dt>
                                                        <dd className='text-right text-sm text-slate-600'>
                                                            {host}
                                                        </dd>
                                                    </div>
                                                )}
                                            </dl>

                                            <button
                                                type='button'
                                                className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-200'
                                            >
                                                {ctaLabel}
                                            </button>
                                        </aside>
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
                ) : (
                    <div className='grid place-items-center rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500'>
                        <p>No events scheduled nearby yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default EventsBoard;
