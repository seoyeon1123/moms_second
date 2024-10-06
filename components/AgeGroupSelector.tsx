import { useState } from 'react';

interface AgeGroupSelectorProps {
  onChange: (value: string) => void;
}

const allAgeGroups = [
  { value: '0-1', label: '0세~1세' },
  { value: '2-3', label: '2세~3세' },
  { value: '4-5', label: '4세~5세' },
  { value: '6', label: '6세 이상' },
];

const filterAgeGroups = (selected: string) => {
  switch (selected) {
    case '0-1':
      return allAgeGroups.filter(
        (g) => g.value === '2-3' || g.value === '4-5' || g.value === '6'
      );
    case '2-3':
      return allAgeGroups.filter((g) => g.value === '4-5' || g.value === '6');
    case '4-5':
      return allAgeGroups.filter((g) => g.value === '6');
    case '6':
      return [];
    default:
      return allAgeGroups;
  }
};

export default function AgeGroutSelector({ onChange }: AgeGroupSelectorProps) {
  const [selected, setSelected] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <label
        htmlFor="age-group"
        className="text-sm font-medium text-neutral-500"
      />

      <select
        id="age-group"
        name="age-group"
        value={selected}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
      >
        <option value="" disabled>
          연령대를 선택하세요
        </option>
        {allAgeGroups.map((group) => (
          <option key={group.value} value={group.value}>
            {group.label}
          </option>
        ))}
      </select>
    </div>
  );
}
