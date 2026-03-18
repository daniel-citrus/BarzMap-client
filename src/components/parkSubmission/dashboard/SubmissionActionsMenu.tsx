import { useEffect, useRef } from 'react';
import type { SubmissionAction } from '../../../types/parkSubmission';

interface SubmissionActionsMenuProps {
    actions: SubmissionAction[];
    submissionId: number | string;
    isOpen: boolean;
    onClose: () => void;
}

const SubmissionActionsMenu = ({ actions, submissionId, isOpen, onClose }: SubmissionActionsMenuProps) => {
    const menuRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as Node;
            if (menuRef.current?.contains(target)) return;
            onClose();
        };

        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <ul
            ref={menuRef}
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
