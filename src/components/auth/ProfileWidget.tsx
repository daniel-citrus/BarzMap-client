import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

/** Same height and horizontal padding as mobile nav row buttons (NavigationMenu). */
const mobileNavShellBase =
    'pointer-events-auto flex h-12 w-full flex-row items-center gap-2 rounded-full bg-white pl-3 pr-4 text-gray-800 shadow-lg shadow-slate-900/15 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600/40 focus-within:ring-offset-2 sm:h-13 sm:pl-3.5 sm:pr-5 md:h-14';

interface ProfileWidgetProps {
    // When false (collapsed desktop sidebar), show profile image and icon-only log out (no name row).
    sidebarExpanded?: boolean;
    // Mobile flyout menu: use same floating control styling as MobileMenuButton.
    mobileNav?: boolean;
}

const ProfileWidget = ({ sidebarExpanded = true, mobileNav = false }: ProfileWidgetProps) => {
    const { isAuthenticated, isLoading, user } = useAuth0();

    if (isLoading) {
        return null;
    }

    if (mobileNav && !isAuthenticated) {
        return <LoginButton variant='mobileNav' />;
    }

    if (mobileNav && isAuthenticated) {
        return (
            <div className={mobileNavShellBase}>
                <div className='flex min-w-0 flex-1 items-center gap-2.5 pl-0.5'>
                    {user?.picture ? (
                        <div className='h-8 w-8 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-1 ring-white shadow-sm ring-offset-1 ring-offset-white'>
                            <img
                                src={user.picture}
                                alt=''
                                className='block h-full w-full object-cover'
                            />
                        </div>
                    ) : (
                        <div
                            className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600'
                            aria-hidden
                        >
                            {(user?.name ?? user?.email ?? '?').slice(0, 1).toUpperCase()}
                        </div>
                    )}
                    <span className='truncate text-sm font-medium tracking-tight text-gray-800'>
                        {user?.name ?? user?.email ?? 'Account'}
                    </span>
                </div>
                <div
                    className='h-6 w-px shrink-0 bg-slate-200'
                    aria-hidden
                />
                <div className='flex shrink-0 items-center justify-end'>
                    <LogoutButton variant='icon' />
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div
                className={`mt-2 w-full border-t border-slate-200 pt-3 ${!sidebarExpanded ? 'flex justify-center' : ''}`}
            >
                <LoginButton variant={sidebarExpanded ? 'full' : 'icon'} />
            </div>
        );
    }

    if (!sidebarExpanded) {
        return (
            <div className='mt-2 flex w-full flex-col items-center gap-1 border-t border-slate-200 pt-3'>
                <div className='flex shrink-0' title={user?.name ?? user?.email ?? 'Account'}>
                    {user?.picture ? (
                        <div className='h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-2 ring-white shadow-sm ring-offset-1 ring-offset-white'>
                            <img
                                src={user.picture}
                                alt={user?.name ?? user?.email ?? 'Account'}
                                className='block h-full w-full object-cover'
                            />
                        </div>
                    ) : (
                        <div
                            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600'
                            role='img'
                            aria-label={user?.name ?? user?.email ?? 'Account'}
                        >
                            {(user?.name ?? user?.email ?? '?').slice(0, 1).toUpperCase()}
                        </div>
                    )}
                </div>
                <LogoutButton variant='icon' />
            </div>
        );
    }

    return (
        <div className='mt-2 w-full border-t border-slate-200 pt-3'>
            <div className='flex flex-col gap-1'>
                <div className='flex min-w-0 items-center gap-3 rounded-lg bg-slate-50/80 px-3 py-2'>
                    {user?.picture ? (
                        <div className='h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-2 ring-white shadow-sm ring-offset-1 ring-offset-slate-50'>
                            <img
                                src={user.picture}
                                alt=''
                                className='block h-full w-full object-cover'
                            />
                        </div>
                    ) : (
                        <div
                            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600'
                            aria-hidden
                        >
                            {(user?.name ?? user?.email ?? '?').slice(0, 1).toUpperCase()}
                        </div>
                    )}
                    <span className='truncate text-sm font-medium tracking-tight text-slate-800'>
                        {user?.name ?? user?.email ?? 'Account'}
                    </span>
                </div>
                <LogoutButton variant='full' />
            </div>
        </div>
    );
};

export default ProfileWidget;
