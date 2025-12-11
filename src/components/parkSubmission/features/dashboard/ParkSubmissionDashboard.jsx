import { useState } from 'react';
import ParkSubmissionViewer from '../viewer/ParkSubmissionViewer';

const SUBMISSIONS = [
    {
        id: 'SUB-10342',
        title: 'Bayview Fitness Parc',
        description:
            'Waterfront calisthenics spot featuring multiple rigs and sunrise views over the bay.',
        address: '842 Marina Vista, San Francisco, CA 94109',
        equipment: [
            'Pull-up Bars',
            'Dip Bars',
            'Push-up Bars',
            'Sit-up Bench',
            'Plyo Boxes',
        ],
        images: [
            'https://images.unsplash.com/photo-1526405796084-b11c2f1e01d2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1621086893820-1a9e3d408c16?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80',
        ],
        submittedAt: '2024-08-24T15:36:00Z',
        submitter: 'dcitrus4',
        moderationComment: '',
        status: 'pending',
    },
    {
        id: 'SUB-10411',
        title: 'Riverbend Street Workout',
        description:
            'Riverfront plaza with multi-height bars and functional fitness circuit equipment.',
        address: '2120 Riverside Dr, Sacramento, CA 95818',
        equipment: [
            'Monkey Bars',
            'Rings',
            'Leg Raise Station',
            'Row Machine',
            'Stepper',
            'Dip Bars',
            'Precision Rails',
        ],
        images: [
            'https://images.unsplash.com/photo-1583459073860-22d2ac790227?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=1200&q=80',
        ],
        submittedAt: '2024-08-18T11:12:00Z',
        submitter: 'sophia.h',
        moderationComment: 'Looks ready—double-check lighting schedule.',
        status: 'approved',
    },
    {
        id: 'SUB-10467',
        title: 'Prairie Muscle Court',
        description:
            'Neighborhood training corner with shaded parallel bars and lower-body conditioning stations.',
        address: '4112 Prairie Ave, Dallas, TX 75204',
        equipment: [
            'Parallettes',
            'Balance Beam',
            'Lunge Bench',
            'Squat Stand',
        ],
        images: [
            'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=1200&q=80',
        ],
        submittedAt: '2024-08-05T20:45:00Z',
        submitter: 'trailmix92',
        moderationComment: 'Needs updated safety inspection paperwork.',
        status: 'denied',
    },
    {
        id: 'SUB-10503',
        title: 'Cascades Calisthenics Cove',
        description:
            'Forest-lined hillside course stacked with advanced obstacles and ninja-style rigs.',
        address: '965 Cascade Ln, Portland, OR 97205',
        equipment: [
            'Pull-up Bars',
            'Climbing Rope',
            'Peg Board',
            'Parkour Wall',
            'Precision Rails',
            'Ninja Grips',
            'Lache Bars',
            'Salmon Ladder',
            'Rings',
        ],
        images: [
            'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80',
        ],
        submittedAt: '2024-07-29T08:18:00Z',
        submitter: 'maraudersclub',
        moderationComment: '',
        status: 'pending',
    },
    {
        id: 'SUB-10552',
        title: 'Summit Strength Plaza',
        description:
            'Downtown plaza featuring recovery-focused mobility stations and bodyweight rigs.',
        address: '1501 Summit Blvd, Denver, CO 80202',
        equipment: [
            'Stretch Bars',
            'Foam Roller Station',
            'Balance Beam',
            'Incline Board',
            'Sit-up Bench',
            'Roman Chair',
        ],
        images: [
            'https://images.unsplash.com/photo-1508595099044-65f30007d4f3?auto=format&fit=crop&w=1200&q=80',
        ],
        submittedAt: '2024-07-21T17:22:00Z',
        submitter: 'keith.n',
        moderationComment: '',
        status: 'pending',
    },
    {
        id: 'SUB-10588',
        title: 'Meadow Core Station',
        description:
            'Family-friendly park core circuit with shaded benches and nearby playground access.',
        address: '88 Meadow Ln, Madison, WI 53703',
        equipment: ['Sit-up Bench', 'Roman Chair', 'Leg Raise Station'],
        images: [
            'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=1200&q=80',
        ],
        submittedAt: '2024-07-09T13:57:00Z',
        submitter: 'fitmomsquad',
        moderationComment: 'Approved—notify parks crew about signage swap.',
        status: 'approved',
    },
    {
        id: 'SUB-10621',
        title: 'Sunrise Street Gym',
        description:
            'Waterfront cardio deck with conditioning machines and sprint track loops.',
        address: '441 Sunrise Ave, Miami, FL 33132',
        equipment: [
            'Plyo Boxes',
            'Sprint Track',
            'Air Walker',
            'Row Machine',
            'Elliptical',
            'Bike Trainer',
            'Hurdles',
            'Calf Block',
        ],
        images: [
            'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1528668163409-9cbf5cb9fe8c?auto=format&fit=crop&w=1200&q=80',
        ],
        submittedAt: '2024-06-30T09:41:00Z',
        submitter: 'alex.ro',
        moderationComment: '',
        status: 'pending',
    },
    {
        id: 'SUB-10654',
        title: 'Lakeshore Movement Hub',
        description:
            'Lakefront station stacked with rings, salmon ladder, and other grip-intensive elements.',
        address: '127 Lakeshore Dr, Chicago, IL 60611',
        equipment: [
            'Ninja Grips',
            'Rings',
            'Salmon Ladder',
            'Lache Bars',
            'Peg Board',
        ],
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
        ],
        submittedAt: '2024-06-22T22:03:00Z',
        submitter: 'jensenV',
        moderationComment: '',
        status: 'pending',
    },
];

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
    const [submissions] = useState(SUBMISSIONS); // becomes an effect that pulls submissions from db
    const [openMenuId, setOpenMenuId] = useState(null);
    const [viewSubmission, setViewSubmission] = useState(null);

    const toggleMenu = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };
    const handleViewSubmission = (id) => {
        console.log('Viewing submission:', id);
        setViewSubmission(id);
    };
    const handleApprove = (id) => {
        console.log('Approved:', id);
    };
    const handleDeny = (id) => {
        console.log('Denied:', id);
    };
    const handleMarkPending = (id) => {
        console.log('Marked pending:', id);
    };
    const handleDelete = (id) => {
        console.log('Deleted:', id);
    };
    const handleCloseSubmissionViewer = () => {
        setViewSubmission(null);
    };

    const ACTIONS = [
        { title: 'View', action: (id) => handleViewSubmission(id) },
        { title: 'Approve', action: (id) => handleApprove(id) },
        { title: 'Deny', action: (id) => handleDeny(id) },
        { title: 'Mark Pending', action: (id) => handleMarkPending(id) },
        { title: 'Delete', action: (id) => handleDelete(id) },
    ];

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
                <ul className='space-y-4 sm:space-y-5'>
                    {submissions.map((submission) => {
                        const {
                            id,
                            submittedAt,
                            submitter,
                            title,
                            address,
                            moderationComment,
                            equipment = [],
                            status,
                        } = submission;
                        const statusClass =
                            STATUS_META[status]?.className ??
                            STATUS_META.pending.className;
                        const statusLabel =
                            STATUS_META[status]?.label ??
                            STATUS_META.pending.label;
                        const equipmentPreview = equipment.slice(0, 5);
                        const remainingEquipmentCount =
                            equipment.length - equipmentPreview.length;
                        return (
                            <li
                                key={id}
                                className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 transition hover:shadow-md hover:shadow-slate-900/10'
                            >
                                <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-slate-400'>
                                            <span className='font-semibold text-slate-500'>
                                                {formatDate(submittedAt)}
                                            </span>
                                            <span className='hidden h-1 w-1 rounded-full bg-slate-300 md:inline-block' />
                                            <span className='text-slate-400'>
                                                {equipment.length} equipment item
                                                {equipment.length === 1 ? '' : 's'}
                                            </span>
                                        </div>
                                        <h2 className='text-lg font-semibold text-slate-900 sm:text-xl'>
                                            {title}
                                        </h2>
                                        <p className='text-sm text-slate-500'>
                                            {address}
                                        </p>
                                    </div>

                                    <div className='flex items-start gap-3'>
                                        <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass}`}
                                        >
                                            {statusLabel}
                                        </span>
                                        <div className='relative'>
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
                                                    className='absolute right-0 top-11 z-10 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 shadow-lg shadow-slate-900/10'
                                                    role='menu'
                                                >
                                                    {ACTIONS.map(
                                                        ({ title, action }) => (
                                                            <li key={title}>
                                                                <button
                                                                    type='button'
                                                                    onClick={() => {
                                                                        action(id);
                                                                        toggleMenu(id);
                                                                    }}
                                                                    className='flex w-full items-center justify-start px-3 py-2 text-left transition hover:bg-slate-100'
                                                                    role='menuitem'
                                                                >
                                                                    {title}
                                                                </button>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 sm:text-sm'>
                                    <span className='inline-flex items-center gap-1 text-slate-600'>
                                        <span className='font-semibold'>Submitted by</span>
                                        <span>{submitter}</span>
                                    </span>
                                    {moderationComment && (
                                        <span className='inline-flex items-center gap-1 text-slate-400'>
                                            <span className='h-1 w-1 rounded-full bg-slate-300' />
                                            <span className='italic'>
                                                "{moderationComment}"
                                            </span>
                                        </span>
                                    )}
                                </div>

                                {equipment.length > 0 && (
                                    <div className='mt-3 flex flex-wrap gap-2'>
                                        {equipmentPreview.map((item, index) => (
                                            <span
                                                key={`${item}-${index}`}
                                                className='rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 sm:text-sm'
                                            >
                                                {item}
                                            </span>
                                        ))}
                                        {remainingEquipmentCount > 0 && (
                                            <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 sm:text-sm'>
                                                +{remainingEquipmentCount} more
                                            </span>
                                        )}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
                {viewSubmission && (
                    <ParkSubmissionViewer
                        submission={submissions.find(
                            (submission) => submission.id === viewSubmission
                        )}
                        onClose={handleCloseSubmissionViewer}
                        onApprove={handleApprove}
                    />
                )}
            </div>
        </section>
    );
};

export default ParkSubmissionDashboard;
