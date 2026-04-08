import { useAuth0 } from '@auth0/auth0-react';

const loginIcon = (
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
        <path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' />
        <polyline points='10 17 15 12 10 7' />
        <line x1='15' y1='12' x2='3' y2='12' />
    </svg>
);

interface LoginButtonProps {
    /** Icon-only control for collapsed sidebar (matches nav icon buttons). */
    variant?: 'full' | 'icon' | 'mobileNav';
}

const LoginButton = ({ variant = 'full' }: LoginButtonProps) => {
    const { loginWithRedirect: login } = useAuth0();

    const onClick = () =>
        login({ authorizationParams: { screen_hint: 'signup' } });

    if (variant === 'mobileNav') {
        return (
            <button
                type='button'
                onClick={onClick}
                className='flex h-12 w-auto min-w-[3rem] items-center justify-start gap-3 rounded-full bg-white pl-3 pr-4 text-slate-700 shadow-lg shadow-slate-900/15 transition-colors duration-200 active:bg-slate-100 sm:h-13 sm:pl-3.5 sm:pr-5 md:h-14 md:hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/40'
                aria-label='Log In'
            >
                <span className='flex h-6 w-6 shrink-0 items-center justify-center sm:h-6 sm:w-6'>
                    {loginIcon}
                </span>
                <span className='text-sm font-medium sm:text-base'>Log In</span>
            </button>
        );
    }

    if (variant === 'icon') {
        return (
            <button
                type='button'
                onClick={onClick}
                title='Log In'
                className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg p-0 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40'
            >
                <span className='flex aspect-square h-10 w-10 min-h-10 min-w-10 shrink-0 items-center justify-center overflow-hidden rounded-md p-2 text-slate-500 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:shrink-0'>
                    {loginIcon}
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
                {loginIcon}
            </span>
            <span>Log In</span>
        </button>
    );
};

export default LoginButton;
