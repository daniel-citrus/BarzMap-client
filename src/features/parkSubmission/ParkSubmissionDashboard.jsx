import { useState } from 'react';

const SUBMISSIONS = [
    {
        id: 'SUB-10342',
        date: '2024-08-24T15:36:00Z',
        user: 'dcitrus4',
        parkName: 'Bayview Fitness Parc',
        parkAddress: '842 Marina Vista, San Francisco, CA 94109',
        equipment: 5,
        status: 'pending',
    },
    {
        id: 'SUB-10411',
        date: '2024-08-18T11:12:00Z',
        user: 'sophia.h',
        parkName: 'Riverbend Street Workout',
        parkAddress: '2120 Riverside Dr, Sacramento, CA 95818',
        equipment: 7,
        status: 'approved',
    },
    {
        id: 'SUB-10467',
        date: '2024-08-05T20:45:00Z',
        user: 'trailmix92',
        parkName: 'Prairie Muscle Court',
        parkAddress: '4112 Prairie Ave, Dallas, TX 75204',
        equipment: 4,
        status: 'denied',
    },
    {
        id: 'SUB-10503',
        date: '2024-07-29T08:18:00Z',
        user: 'maraudersclub',
        parkName: 'Cascades Calisthenics Cove',
        parkAddress: '965 Cascade Ln, Portland, OR 97205',
        equipment: 9,
        status: 'pending',
    },
    {
        id: 'SUB-10552',
        date: '2024-07-21T17:22:00Z',
        user: 'keith.n',
        parkName: 'Summit Strength Plaza',
        parkAddress: '1501 Summit Blvd, Denver, CO 80202',
        equipment: 6,
        status: 'pending',
    },
    {
        id: 'SUB-10588',
        date: '2024-07-09T13:57:00Z',
        user: 'fitmomsquad',
        parkName: 'Meadow Core Station',
        parkAddress: '88 Meadow Ln, Madison, WI 53703',
        equipment: 3,
        status: 'approved',
    },
    {
        id: 'SUB-10621',
        date: '2024-06-30T09:41:00Z',
        user: 'alex.ro',
        parkName: 'Sunrise Street Gym',
        parkAddress: '441 Sunrise Ave, Miami, FL 33132',
        equipment: 8,
        status: 'pending',
    },
    {
        id: 'SUB-10654',
        date: '2024-06-22T22:03:00Z',
        user: 'jensenV',
        parkName: 'Lakeshore Movement Hub',
        parkAddress: '127 Lakeshore Dr, Chicago, IL 60611',
        equipment: 5,
        status: 'pending',
    },
];

const ACTIONS = ['View', 'Approve', 'Deny', 'Delete'];

const STATUS_META = {
    pending: {
        label: 'Pending',
        className: 'bg-amber-100 text-amber-700',
    },
    approved: {
        label: 'Approved',
        className: 'bg-emerald-100 text-emerald-700',
    },
    denied: {
        label: 'Denied',
        className: 'bg-rose-100 text-rose-700',
    },
};

const formatDate = (value) =>
    new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    }).format(new Date(value));

const ParkSubmissionDashboard = () => {
    const [submissions, setSubmissions] = useState(SUBMISSIONS);
    const [openMenuId, setOpenMenuId] = useState(null);

    const setStatus = (id, nextStatus) => {
        setSubmissions((prev) =>
            prev.map((submission) =>
                submission.id === id
                    ? { ...submission, status: nextStatus }
                    : submission
            )
        );
    };

    const toggleMenu = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const handleAction = (id, action) => {
        // TODO: integrate admin action handlers
        setOpenMenuId(null);

        switch (action) {
            case 'Approve':
                setStatus(id, 'approved');
                break;
            case 'Deny':
                setStatus(id, 'denied');
                break;
            case 'Delete':
                setSubmissions((prev) =>
                    prev.filter((submission) => submission.id !== id)
                );
                break;
            default:
                break;
        }

        console.log(`Action "${action}" selected for ${id}`);
    };

    return (
        <section className='mx-auto flex w-full max-w-6xl flex-col gap-6 p-6'>
            <header className='flex flex-col gap-2'>
                <h1 className='text-2xl font-semibold text-slate-900'>
                    Park Submission Dashboard
                </h1>
                <p className='text-sm text-slate-500'>
                    Manage submissions, review details, and approve community
                    updates.
                </p>
            </header>

            <div className='rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-sm text-slate-600 sm:p-8'>
                <div className='hidden grid-cols-[1fr_0.9fr_1.6fr_1.6fr_0.8fr_0.6fr_0.4fr] gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:grid sm:text-[0.7rem]'>
                    <span>Date</span>
                    <span>Submitted By</span>
                    <span>Park Name</span>
                    <span>Park Address</span>
                    <span className='text-right'>Status</span>
                    <span className='text-right'>Equipment</span>
                    <span className='text-right'>Actions</span>
                </div>

                <ul className='mt-3 space-y-4'>
                    {submissions.map(
                        ({
                            id,
                            date,
                            user,
                            parkName,
                            parkAddress,
                            equipment,
                            status,
                        }) => (
                            <li
                                key={id}
                                className='grid grid-cols-1 gap-2 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm shadow-slate-900/5 sm:grid-cols-[1fr_0.9fr_1.6fr_1.6fr_0.8fr_0.6fr_0.4fr] sm:gap-3 sm:items-center'
                            >
                                <div className='flex items-baseline justify-between sm:hidden'>
                                    <span className='text-xs font-semibold text-slate-500'>
                                        {formatDate(date)}
                                    </span>
                                    <span className='text-xs font-medium text-slate-400'>
                                        {equipment} eq.
                                    </span>
                                </div>
                                <span className='hidden text-xs font-semibold text-slate-500 sm:block sm:text-sm'>
                                    {formatDate(date)}
                                </span>
                                <span className='text-sm font-medium text-slate-700'>
                                    {user}
                                </span>
                                <span className='text-base font-semibold text-slate-900 sm:text-sm'>
                                    {parkName}
                                </span>
                                <span className='text-sm text-slate-500'>
                                    {parkAddress}
                                </span>
                                <span className='hidden justify-end sm:flex'>
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                            STATUS_META[status]?.className ??
                                            STATUS_META.pending.className
                                        }`}
                                    >
                                        {STATUS_META[status]?.label ??
                                            STATUS_META.pending.label}
                                    </span>
                                </span>
                                <span className='hidden text-right text-xs font-medium text-slate-400 sm:block sm:text-sm'>
                                    {equipment}
                                </span>
                                <span className='sm:hidden'>
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                            STATUS_META[status]?.className ??
                                            STATUS_META.pending.className
                                        }`}
                                    >
                                        {STATUS_META[status]?.label ??
                                            STATUS_META.pending.label}
                                    </span>
                                </span>
                                <div className='relative flex justify-start sm:justify-end'>
                                    <button
                                        type='button'
                                        onClick={() => toggleMenu(id)}
                                        className='inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:text-slate-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-300'
                                        aria-haspopup='menu'
                                        aria-expanded={openMenuId === id}
                                    >
                                        <svg
                                            viewBox='0 0 20 20'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5'
                                        >
                                            <path
                                                d='M10 4.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'
                                                fill='currentColor'
                                            />
                                        </svg>
                                    </button>
                                    {openMenuId === id && (
                                        <ul
                                            className='absolute right-0 top-11 z-10 w-32 overflow-hidden rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 shadow-lg shadow-slate-900/10'
                                            role='menu'
                                        >
                                            {ACTIONS.map((action) => (
                                                <li key={action}>
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            handleAction(
                                                                id,
                                                                action
                                                            )
                                                        }
                                                        className='flex w-full items-center justify-start px-3 py-2 text-left transition hover:bg-slate-100'
                                                        role='menuitem'
                                                    >
                                                        {action}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </section>
    );
};

export default ParkSubmissionDashboard;
