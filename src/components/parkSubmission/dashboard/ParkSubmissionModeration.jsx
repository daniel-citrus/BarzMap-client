import { useState } from 'react';

const ParkSubmissionModeration = ({
    id,
    onApprove,
    onReject,
    onPending,
    onDelete,
    initialComment = '',
    approveLabel = 'Approve',
    rejectLabel = 'Reject',
    pendingLabel = 'Pending',
    deleteLabel = 'Delete',
    commentPlaceholder = 'Add an optional note for the submitter...',
}) => {
    const [comment, setComment] = useState(initialComment);

    return (
        <section className='mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6'>
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='park-submission-comment'
                    className='text-xs font-semibold uppercase tracking-wide text-slate-500'
                >
                    Admin Comment
                </label>
                <textarea
                    id='park-submission-comment'
                    value={comment}
                    onChange={e => { setComment(e.target.value) }}
                    rows={4}
                    placeholder={commentPlaceholder}
                    className='w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200'
                />
            </div>

            <div className='flex flex-col gap-3 md:flex-row md:flex-wrap'>
                <button
                    type='button'
                    onClick={() => { onApprove(id) }}
                    className='inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2'
                >
                    {approveLabel}
                </button>
                <button
                    type='button'
                    onClick={() => { onPending(id) }}
                    className='inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2'
                >
                    {pendingLabel}
                </button>
                <button
                    type='button'
                    onClick={() => { onReject(id) }}
                    className='inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2'
                >
                    {rejectLabel}
                </button>
                <button
                    type='button'
                    onClick={() => { onDelete(id) }}
                    className='inline-flex items-center justify-center rounded-full bg-slate-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'
                >
                    {deleteLabel}
                </button>
            </div>
        </section >
    );
};

export default ParkSubmissionModeration;

