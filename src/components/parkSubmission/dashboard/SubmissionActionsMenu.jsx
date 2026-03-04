const SubmissionActionsMenu = ({ actions, submissionId, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <ul
            className='absolute right-0 top-11 z-10 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 shadow-lg shadow-slate-900/10'
            role='menu'
        >
            {actions.map(({ id: actionId, title, action }) => (
                <li key={actionId ?? title}>
                    <button
                        type='button'
                        onClick={() => {
                            action(submissionId);
                            onClose();
                        }}
                        className='flex w-full items-center justify-start px-3 py-2 text-left transition hover:bg-slate-100'
                        role='menuitem'
                    >
                        {title}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default SubmissionActionsMenu;
