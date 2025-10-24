/* 
Submissions
    - Submission Date
    - Submittor
    - Park Name
    - Park Address
    - Number of equipment
*/

const SUBMISSIONS = [
    {
        id: 'SUB-10342',
        date: '2024-08-24T15:36:00Z',
        user: 'dcitrus4',
        parkName: 'Bayview Fitness Parc',
        parkAddress: '842 Marina Vista, San Francisco, CA 94109',
        equipment: 5,
    },
    {
        id: 'SUB-10411',
        date: '2024-08-18T11:12:00Z',
        user: 'sophia.h',
        parkName: 'Riverbend Street Workout',
        parkAddress: '2120 Riverside Dr, Sacramento, CA 95818',
        equipment: 7,
    },
    {
        id: 'SUB-10467',
        date: '2024-08-05T20:45:00Z',
        user: 'trailmix92',
        parkName: 'Prairie Muscle Court',
        parkAddress: '4112 Prairie Ave, Dallas, TX 75204',
        equipment: 4,
    },
    {
        id: 'SUB-10503',
        date: '2024-07-29T08:18:00Z',
        user: 'maraudersclub',
        parkName: 'Cascades Calisthenics Cove',
        parkAddress: '965 Cascade Ln, Portland, OR 97205',
        equipment: 9,
    },
    {
        id: 'SUB-10552',
        date: '2024-07-21T17:22:00Z',
        user: 'keith.n',
        parkName: 'Summit Strength Plaza',
        parkAddress: '1501 Summit Blvd, Denver, CO 80202',
        equipment: 6,
    },
    {
        id: 'SUB-10588',
        date: '2024-07-09T13:57:00Z',
        user: 'fitmomsquad',
        parkName: 'Meadow Core Station',
        parkAddress: '88 Meadow Ln, Madison, WI 53703',
        equipment: 3,
    },
    {
        id: 'SUB-10621',
        date: '2024-06-30T09:41:00Z',
        user: 'alex.ro',
        parkName: 'Sunrise Street Gym',
        parkAddress: '441 Sunrise Ave, Miami, FL 33132',
        equipment: 8,
    },
    {
        id: 'SUB-10654',
        date: '2024-06-22T22:03:00Z',
        user: 'jensenV',
        parkName: 'Lakeshore Movement Hub',
        parkAddress: '127 Lakeshore Dr, Chicago, IL 60611',
        equipment: 5,
    },
];
const ParkSubmissionDashboard = () => {
    return (
        <section className='mx-auto flex w-full max-w-6xl flex-col gap-6 p-6'>
            <header className='flex flex-col gap-2'>
                <h1 className='text-2xl font-semibold text-slate-900'>
                    Park Submission Dashboard
                </h1>
                <p className='text-sm text-slate-500'>
                    Manage submissions, review details, and approve community
                    updates.
                </p>
            </header>
            <div className='rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-8 text-sm text-slate-600'>
                <ul className='space-y-4'>
                    {SUBMISSIONS.map(
                        ({ id, date, user, parkName, parkAddress, equipment }) => {
                            const displayDate = new Intl.DateTimeFormat('en-US', {
                                timeZone: 'UTC',
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                            }).format(new Date(date));

                            return (
                                <li
                                    key={id}
                                    className='flex flex-col gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-900/5 sm:flex-row sm:items-center sm:justify-between sm:gap-4'
                                >
                                    <div className='flex flex-col gap-1'>
                                        <span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                                            {displayDate} • {user}
                                        </span>
                                        <span className='text-sm font-semibold text-slate-900'>
                                            {parkName}
                                        </span>
                                        <span className='text-xs text-slate-500'>
                                            {parkAddress}
                                        </span>
                                    </div>
                                    <span className='text-xs font-medium uppercase tracking-wide text-indigo-500 sm:text-sm'>
                                        {equipment} pieces of equipment
                                    </span>
                                </li>
                            );
                        }
                    )}
                </ul>
            </div>
        </section>
    );
};

export default ParkSubmissionDashboard;
