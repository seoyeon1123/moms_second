'use client';

import { useEffect, useState } from 'react';

export default function SelectPostCategory({
  setSelectCategory,
}: {
  setSelectCategory: (category: string) => void;
}) {
  const [selectValue, setSelectValue] = useState('육아팁');

  const onchangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue); // 선택된 값을 상태에 설정합니다.
    setSelectCategory(selectedValue); // 부모 컴포넌트에 선택된 값을 전달합니다.
  };

  return (
    <>
      <select
        value={selectValue}
        onChange={onchangeValue}
        name="category"
        className="bg-orange-500 p-2 rounded-full text-sm text-white font-bold"
      >
        <option value={'육아팁'}>육아 팁</option>
        <option value={'임신&출산'}>임신 & 출산</option>
        <option value={'육아 용품 추천'}>육아 용품 추천</option>
        <option value={'건강&영양'}>건강 & 영양</option>
        <option value={'성장이야기'}>우리아이 성장 이야기</option>
        <option value={'부모모임'}>부모 모임</option>
        <option value={'기타'}>기타</option>
      </select>
    </>
  );
}
