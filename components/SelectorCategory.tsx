'use client';

import { useEffect, useState } from 'react';

export default function SelectorCategory({
  setSelectCategory,
}: {
  setSelectCategory: (category: string) => void;
}) {
  const [selectValue, setSelectValue] = useState('상의');
  const onChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    setSelectCategory(e.target.value);
  };

  useEffect(() => {
    setSelectCategory('상의');
  }, []);

  return (
    <>
      <select
        value={selectValue}
        onChange={onChangeValue}
        name="category"
        className="bg-orange-500 p-2 rounded-full text-sm text-white font-bold"
      >
        <option value={'상의'} className="bg-orange-500 bg-opacity-40">
          상의
        </option>
        <option value={'하의'}>하의</option>
        <option value={'아우터'}>아우터</option>
        <option value={'바지'}>바지</option>
        <option value={'모자'}>모자</option>
        <option value={'신발'}>신발</option>
        <option value={'육아용품'}>육아용품</option>
        <option value={'놀잇감'}>놀잇감</option>
      </select>
    </>
  );
}
