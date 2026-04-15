import { useAuth0 } from '@auth0/auth0-react';

const BecomeaSpotter = () => {
    const { loginWithRedirect: login } = useAuth0();

    const onContribute = () => login();

    return (
        <section className='mx-auto flex w-full max-w-6xl flex-col gap-6 p-6 sm:p-8'>
            <header className='flex flex-col gap-2 text-slate-900'>
                <p className='text-xs font-semibold uppercase tracking-wide text-indigo-500'>
                    Join the map
                </p>
                <h2 className='text-2xl font-semibold sm:text-3xl'>Welcome to BarzMap</h2>
                <p className='mt-1 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base'>
                    Add parks, photos, and pins so people can find outdoor spots to train. Sign
                    in anytime if you already have an account.
                </p>
            </header>

            <div className='flex max-w-2xl flex-col gap-4 text-[15px] leading-relaxed text-slate-600 sm:text-base'>
                <p>
                    BarzMap helps people find calisthenics and workout parks. We believe staying healthy should
                    be easy to access and free.
                </p>
                <p>
                    Add photos, pin locations, and help others find places to train!
                </p>
                <div className='pt-1'>
                    <button
                        type='button'
                        onClick={onContribute}
                        className='inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-200 sm:w-auto'
                    >
                        Sign Up or Login to Contribute
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BecomeaSpotter;
