import { useEffect, useRef, useState } from 'react';

const EQUIPMENT = [
    {
        focus: 'Upper Body',
        equipment: [
            'Pull-up Bars',
            'Monkey Bars',
            'Dip Bars',
            'Push-up Bars',
            'Parallettes',
            'Rings',
            'Climbing Rope',
            'Stall Bars',
            'Peg Board',
            'Salmon Ladder',
            'Lache Bars',
        ],
    },
    {
        focus: 'Core & Midsection',
        equipment: [
            'Sit-up Bench',
            'Roman Chair',
            'Leg Raise Station',
            'Incline Bench',
            'Incline Board',
            'Stall Bars',
        ],
    },
    {
        focus: 'Lower Body',
        equipment: [
            'Plyo Boxes',
            'Balance Beam',
            'Lunge Bench',
            'Squat Stand',
            'Calf Block',
            'Hurdles',
            'Sprint Track',
        ],
    },
    {
        focus: 'Mobility & Flexibility',
        equipment: [
            'Stretch Bars',
            'Foam Roller Station',
            'Balance Beam',
            'Incline Board',
        ],
    },
    {
        focus: 'Skill & Coordination',
        equipment: [
            'Parkour Wall',
            'Precision Rails',
            'Ninja Grips',
            'Rings',
            'Lache Bars',
            'Peg Board',
            'Salmon Ladder',
        ],
    },
    {
        focus: 'Conditioning & Endurance',
        equipment: [
            'Stepper',
            'Air Walker',
            'Row Machine',
            'Bike Trainer',
            'Elliptical',
        ],
    },
];

const EquipmentGroup = ({
    group,
    isOpen,
    onToggle,
    isRequired,
    firstOption,
}) => {
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');
    const [selectedCount, setSelectedCount] = useState(0);

    useEffect(() => {
        const contentEl = contentRef.current;
        if (!contentEl) {
            return undefined;
        }

        if (isOpen) {
            const updateHeight = () => {
                setMaxHeight(`${contentEl.scrollHeight}px`);
            };

            updateHeight();

            let resizeObserver;
            if (typeof ResizeObserver !== 'undefined') {
                resizeObserver = new ResizeObserver(updateHeight);
                resizeObserver.observe(contentEl);
            }

            return () => {
                resizeObserver?.disconnect();
            };
        }

        setMaxHeight('0px');
        return undefined;
    }, [isOpen, group.equipment]);

    const onToggleEquipment = (event) => {
        const { checked } = event.target;

        setSelectedCount((prev) => (checked ? prev + 1 : Math.max(prev - 1, 0)));
    };

    return (
        <div className='rounded-xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5'>
            <button
                type='button'
                onClick={onToggle}
                className='flex w-full items-center justify-between text-left text-sm font-semibold text-slate-700'
                aria-expanded={isOpen}
                aria-controls={`${group.focus}-equipment`}
            >
                <span className='flex items-center gap-3'>
                    <span>{group.focus}</span>
                    {selectedCount > 0 && (
                        <span className='inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-slate-500'>
                            {selectedCount} selected
                        </span>
                    )}
                </span>
                <span
                    className={`ml-3 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                >
                    <svg
                        aria-hidden='true'
                        className='h-3.5 w-3.5'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M5 8.5 10 13l5-4.5'
                            stroke='currentColor'
                            strokeWidth='1.6'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </span>
            </button>
            <div
                id={`${group.focus}-equipment`}
                className='overflow-hidden transition-[max-height] duration-300 ease-in-out'
                style={{ maxHeight }}
            >
                <div
                    ref={contentRef}
                    className='grid gap-3 pt-3 sm:grid-cols-2'
                    aria-hidden={!isOpen}
                >
                    {group.equipment.map((item) => (
                        <label
                            key={`${group.focus}-${item}`}
                            className='flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-white'
                        >
                            <input
                                type='checkbox'
                                name='equipment'
                                value={item}
                                className='mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                                required={isRequired && item === firstOption}
                                onChange={onToggleEquipment}
                            />
                            <span>{item}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

const EquipmentSelector = ({ isRequired = false }) => {
    const firstOption = EQUIPMENT[0]?.equipment[0];
    const [openSections, setOpenSections] = useState(() =>
        EQUIPMENT.length ? new Set([EQUIPMENT[0].focus]) : new Set()
    );

    const handleToggle = (focus) => {
        setOpenSections((prev) => {
            const next = new Set(prev);
            if (next.has(focus)) {
                next.delete(focus);
            } else {
                next.add(focus);
            }
            return next;
        });
    };

    return (
        <section className='space-y-5'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                Equipment
                {isRequired && <span className='text-rose-500'> *</span>}
            </h2>
            <div className='space-y-4'>
                {EQUIPMENT.map((group) => (
                    <EquipmentGroup
                        key={group.focus}
                        group={group}
                        firstOption={firstOption}
                        isRequired={isRequired}
                        isOpen={openSections.has(group.focus)}
                        onToggle={() => handleToggle(group.focus)}
                    />
                ))}
            </div>
        </section>
    );
};

export default EquipmentSelector;
