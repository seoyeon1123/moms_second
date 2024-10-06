import { group } from 'console';
import { useState } from 'react';

interface IGenderSelectionProps {
  onChange: (value: string) => void;
}

const allGender = [
  { value: '여자', label: '여자' },
  { value: '남자', label: '남자' },
];

const filterGender = (selected: string) => {
  switch (selected) {
    case '여자':
      return allGender.filter((g) => g.value === '남자');
    case '남자':
      return [];
  }
};

export default function GenderSelection({ onChange }: IGenderSelectionProps) {
  const [selected, setSelected] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-2 w-full">
        <label
          htmlFor="gender"
          className="text-sm font-medium text-neutral-500"
        />

        <select
          id="gender"
          name="gender"
          value={selected}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
        >
          <option value="" disabled>
            성별을 선택하세요
          </option>
          {allGender.map((gender) => (
            <option key={gender.value}>{gender.label}</option>
          ))}
        </select>
      </div>
    </>
  );
}
