import { useState } from 'react';

const ParkSubmissionModeration = ({
    onApprove,
    onDeny,
    onCommentChange,
    initialComment = '',
    approveLabel = 'Approve',
    denyLabel = 'Deny',
    commentPlaceholder = 'Add an optional note for the submitter...',
}) => {
    const [comment, setComment] = useState(initialComment);

    const handleCommentChange = (event) => {
        const { value } = event.target;
        setComment(value);
        onCommentChange?.(value);
    };

    const handleApprove = () => {
        onApprove?.(comment.trim());
    };

    const handleDeny = () => {
        onDeny?.(comment.trim());
    };

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
                    onChange={handleCommentChange}
                    rows={4}
                    placeholder={commentPlaceholder}
                    className='w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200'
                />
            </div>

            <div className='flex flex-wrap gap-3'>
                <button
                    type='button'
                    onClick={handleApprove}
                    className='inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2'
                >
                    {approveLabel}
                </button>
                <button
                    type='button'
                    onClick={handleDeny}
                    className='inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2'
                >
                    {denyLabel}
                </button>
            </div>
        </section>
    );
};

export default ParkSubmissionModeration;
