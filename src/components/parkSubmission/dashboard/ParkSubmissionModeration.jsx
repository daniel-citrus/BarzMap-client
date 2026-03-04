import { useState } from 'react';

const BASE_BUTTON_CLASS =
    'inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold text-white transition focus:outline-none focus:ring-2';

const ParkSubmissionModeration = ({
    id,
    actions = [],
    onClose,
    initialComment = '',
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
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder={commentPlaceholder}
                    className='w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200'
                />
            </div>

            <div className='flex flex-col gap-3 md:flex-row md:flex-wrap'>
                {actions.map(({ id: actionId, title, action, buttonClassName }) => (
                    <button
                        key={actionId}
                        type='button'
                        onClick={() => action(id)}
                        className={`${BASE_BUTTON_CLASS} ${buttonClassName || ''}`}
                    >
                        {title}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default ParkSubmissionModeration;

