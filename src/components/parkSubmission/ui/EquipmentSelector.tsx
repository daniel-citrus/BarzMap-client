import { useState } from 'react';
import useEquipment from '../../../hooks/useEquipment';

interface EquipmentSelectorProps {
    isRequired?: boolean;
    onEquipmentChange?: (ids: number[]) => void;
}

const EquipmentSelector = ({ isRequired = false, onEquipmentChange }: EquipmentSelectorProps) => {
    const { equipment } = useEquipment();
    const [selectedEquipment, setSelectedEquipment] = useState<Set<number>>(new Set());

    const handleToggle = (itemId: number) => {
        const newSet = new Set(selectedEquipment);

        if (newSet.has(itemId)) {
            newSet.delete(itemId);
        } else {
            newSet.add(itemId);
        }
        setSelectedEquipment(newSet);
        if (onEquipmentChange) {
            onEquipmentChange(Array.from(newSet));
        }
    };

    const equipmentList = Array.isArray(equipment) ? equipment : [];
    const selectedCount = selectedEquipment.size;

    return (
        <section className='space-y-4'>
            <div className='flex items-center justify-between'>
                <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                    Equipment
                    {isRequired && <span className='text-rose-500'> *</span>}
                </h2>
                {selectedCount > 0 && (
                    <span className='text-xs font-medium text-slate-500'>
                        {selectedCount} selected
                    </span>
                )}
            </div>

            {equipmentList.length === 0 ? (
                <div className='rounded-lg border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500'>
                    No equipment available
                </div>
            ) : (
                <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                    {equipmentList.map((item) => {
                        const itemId = item?.id;
                        const itemLabel = item?.name;
                        const isSelected = itemId !== undefined && selectedEquipment.has(itemId);

                        return (
                            <label
                                key={itemId}
                                className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-sm transition cursor-pointer ${isSelected
                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:bg-white'
                                    }`}
                            >
                                <input
                                    type='checkbox'
                                    name='equipment'
                                    value={itemId}
                                    checked={isSelected}
                                    onChange={() => handleToggle(itemId)}
                                    className='mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                                    required={isRequired && selectedCount === 0}
                                />
                                <span className='flex-1'>{itemLabel}</span>
                            </label>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default EquipmentSelector;
