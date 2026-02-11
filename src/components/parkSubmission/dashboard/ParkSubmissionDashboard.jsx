import { useState, useMemo } from 'react';
import ParkSubmissionViewer from './ParkSubmissionViewer';
import useParkSubmissions from '../../../hooks/useParkSubmissions';
import useParkSubmissionActions from '../../../hooks/useParkSubmissionActions';

const STATUS_META = {
    pending: {
        label: 'Pending',
        className: 'bg-amber-100 text-amber-700',
    },
    approved: {
        label: 'Approved',
        className: 'bg-emerald-100 text-emerald-700',
    },
    rejected: {
        label: 'Rejected',
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
    const { parkSubmissions, loading, error, refresh } = useParkSubmissions();
    const { approve, markPending, reject, deleteSubmission } = useParkSubmissionActions();
    const [openMenuId, setOpenMenuId] = useState(null);
    const [viewSubmission, setViewSubmission] = useState(null);
    const [statusFilter, setStatusFilter] = useState('pending');

    // Transform API data to match component expectations and filter by status
    const submissions = useMemo(() => {
        if (!parkSubmissions) return [];
        return parkSubmissions
            .map((park) => ({
                id: park.id,
                title: park.name || '',
                description: park.description || '',
                address: park.address || '',
                submittedAt: park.submit_date || park.created_at || '',
                submitter: park.submitted_by || '',
                moderationComment: park.admin_notes || '',
                status: park.status || 'pending',
            }))
            .filter((submission) => submission.status === statusFilter);
    }, [parkSubmissions, statusFilter]);

    const toggleMenu = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const handleViewSubmission = (id) => {
        setViewSubmission(id);
    };

    const handleCloseSubmissionViewer = () => {
        setViewSubmission(null);
    };

    // Generic handler for async submission actions (approve, deny, markPending, delete)
    const createActionHandler = (actionFn, actionName) => {
        return async (id) => {
            try {
                await actionFn(id);
                refresh();
                setViewSubmission(null);
            } catch (error) {
                console.error(`Failed to ${actionName} submission ${id}:`, error);
            }
        };
    };

    const handleApprove = createActionHandler(approve, 'approve');
    const handleReject = createActionHandler(reject, 'deny');
    const handleMarkPending = createActionHandler(markPending, 'mark as pending');
    const handleDelete = createActionHandler(deleteSubmission, 'delete');

    const ACTIONS = [
        { title: 'View', action: handleViewSubmission },
        { title: 'Approve', action: handleApprove },
        { title: 'Reject', action: handleReject },
        { title: 'Mark Pending', action: handleMarkPending },
        { title: 'Delete', action: handleDelete },
    ];

    // Helper function to get status metadata
    const getStatusMeta = (status) => {
        return STATUS_META[status] || STATUS_META.pending;
    };

    // Memoize selected submission to avoid recalculating on every render
    const selectedSubmission = useMemo(() => {
        return submissions.find((submission) => submission.id === viewSubmission);
    }, [submissions, viewSubmission]);

    return (
        <section className='mx-auto flex w-full max-w-6xl flex-col gap-6 p-6'>
            <header className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-semibold text-slate-900'>
                        Park Submission Dashboard
                    </h1>
                    <p className='text-sm text-slate-500'>
                        Manage submissions, review details, and approve community
                        updates.
                    </p>
                </div>

                {/* Status Filter */}
                <div className='flex flex-wrap items-center gap-2'>
                    <span className='text-sm font-medium text-slate-600'>Filter by status:</span>
                    {Object.keys(STATUS_META).map((status) => (
                        <button
                            key={status}
                            type='button'
                            onClick={() => setStatusFilter(status)}
                            className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${statusFilter === status
                                ? STATUS_META[status].className + ' ring-2 ring-offset-2 ring-slate-300'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {STATUS_META[status].label}
                        </button>
                    ))}
                </div>
            </header>

            <div className='rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-sm text-slate-600 sm:p-8'>
                {loading && (
                    <div className='py-8 text-center text-slate-500'>
                        Loading submissions...
                    </div>
                )}
                {error && (
                    <div className='py-8 text-center text-rose-600'>
                        Error loading submissions: {error.message}
                    </div>
                )}
                {!loading && !error && submissions.length === 0 && (
                    <div className='py-8 text-center text-slate-500'>
                        No submissions found.
                    </div>
                )}
                {!loading && !error && submissions.length > 0 && (
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
                            const { className: statusClass, label: statusLabel } = getStatusMeta(status);
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
                )}
                {selectedSubmission && (
                    <ParkSubmissionViewer
                        submission={selectedSubmission}
                        onClose={handleCloseSubmissionViewer}
                        onApprove={handleApprove}
                        onPending={handleMarkPending}
                        onDeny={handleReject}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </section>
    );
};

export default ParkSubmissionDashboard;
