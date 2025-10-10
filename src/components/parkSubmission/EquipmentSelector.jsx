const EQUIPMENT_OPTIONS = [
    'Playground',
    'Picnic Tables',
    'Restrooms',
    'Sports Fields',
    'Parking',
    'Dog Park',
    'Walking Trails',
];

const EquipmentSelector = () => {
    return (
        <section className='space-y-4'>
            <h2 className='text-sm font-medium text-slate-700'>Equipment</h2>
            <div className='grid gap-3 sm:grid-cols-2'>
                {EQUIPMENT_OPTIONS.map((option) => (
                    <label
                        key={option}
                        className='flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-white'
                    >
                        <input
                            type='checkbox'
                            name='equipment'
                            value={option}
                            className='mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
        </section>
    );
};

export default EquipmentSelector;
