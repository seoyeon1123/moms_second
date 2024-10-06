'use client';

import { useImageUpload } from '@/components/UseImageUpload';
import { useInterceptAction } from '@/components/useInterceptAction';
import AddAction from './actions';
import { useFormState } from 'react-dom';
import { MusicalNoteIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Input from '@/components/input';
import { useState } from 'react';
import CheckBox from '@/components/CheckBox';
import SelectorCategory from '@/components/SelectorCategory';

export default function AddShareOrSell() {
  const { preview, uploadUrl, photoId, onChangeImage } = useImageUpload();
  const interceptAction = useInterceptAction(uploadUrl, photoId, AddAction);
  const [check, setCheck] = useState(false);
  const [selectCategory, setSelectCategory] = useState('상의');

  const onChange = () => {
    setCheck((prev) => !prev);
  };

  const [state, action] = useFormState(interceptAction, null);

  return (
    <div className="flex flex-col justify-center items-center  mt-48 gap-8">
      <h1 className="text-center font-semibold text-3xl text-gray-800">
        상품의 상세 정보를 입력해주세요
      </h1>

      <form
        className="flex flex-col justify-center items-center gap-4 bg-white shadow-lg rounded-lg p-8 w-[800px]"
        action={action}
      >
        <div className="flex flex-row gap-3">
          <div>
            <label
              className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-400 border-neutral-300 rounded-lg border-dashed cursor-pointer bg-center bg-cover w-96 h-96"
              htmlFor="profileImage"
              style={{
                backgroundImage: `url(${preview})`,
                zIndex: 1,
              }}
            >
              {preview ? null : <PhotoIcon className="w-20 h-20" />}
            </label>
            <input
              onChange={onChangeImage}
              type="file"
              className="hidden"
              name="photo"
              accept="image/*"
              id="profileImage"
            />
          </div>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-row justify-start items-center gap-3">
              <p className="font-medium text-gray-700">카테고리 선택:</p>
              <SelectorCategory setSelectCategory={setSelectCategory} />
            </div>

            <Input
              type="text"
              placeholder="제목"
              required
              name="title"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              errors={[]}
            />

            <div className="flex items-center gap-3">
              <p className="font-medium text-gray-700">거래방식:</p>
              <CheckBox check={check} onChange={onChange} />
            </div>

            <Input
              type="text"
              placeholder="가격"
              readOnly={check}
              name="price"
              required={!check}
              className={`w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none ${
                check
                  ? 'bg-gray-100 cursor-not-allowed'
                  : 'focus:ring-2 focus:ring-orange-500'
              }`}
              errors={[]}
            />

            <Input
              type="textarea"
              placeholder="자세한 설명"
              required
              name="description"
              className="w-full border rounded-lg py-2 text-gray-700 "
              errors={[]}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300 ease-in-out"
        >
          저장
        </button>
      </form>
    </div>
  );
}
