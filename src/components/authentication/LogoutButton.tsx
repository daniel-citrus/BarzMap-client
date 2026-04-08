import { useAuth0 } from '@auth0/auth0-react';

const logoutIcon = (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden
    >
        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
        <polyline points='16 17 21 12 16 7' />
        <line x1='21' y1='12' x2='9' y2='12' />
    </svg>
);

interface LogoutButtonProps {
    /** Icon-only control for collapsed sidebar (matches nav icon buttons). */
    variant?: 'full' | 'icon';
}

const LogoutButton = ({ variant = 'full' }: LogoutButtonProps) => {
    const { logout } = useAuth0();

    const onClick = () =>
        logout({ logoutParams: { returnTo: window.location.origin } });

    if (variant === 'icon') {
        return (
            <button
                type='button'
                onClick={onClick}
                title='Log out'
                aria-label='Log out'
                className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg p-0 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40'
            >
                <span className='flex aspect-square h-10 w-10 min-h-10 min-w-10 shrink-0 items-center justify-center overflow-hidden rounded-md p-2 text-slate-500 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:shrink-0'>
                    {logoutIcon}
                </span>
            </button>
        );
    }

    return (
        <button
            type='button'
            onClick={onClick}
            className='flex w-full min-h-10 items-center gap-3 rounded-lg py-2.5 px-3 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40'
        >
            <span className='flex h-6 w-6 min-h-6 min-w-6 shrink-0 items-center justify-center overflow-hidden text-slate-500 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:shrink-0'>
                {logoutIcon}
            </span>
            <span>Log out</span>
        </button>
    );
};

export default LogoutButton;
