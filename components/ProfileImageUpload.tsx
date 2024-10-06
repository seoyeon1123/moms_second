'use client';
import SaveBabyProfile, { getUploadUrl } from '@/app/profile/actions';
import { PhotoIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { useState } from 'react';

export default function ProfileImage() {
  const [preview, setPreview] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [photoId, setPhotoId] = useState('');

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) {
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    const { result, success } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setPhotoId(id);
    }
    console.log(result);
  };

  const interceptAction = async (prevState: any, formData: FormData) => {
    const file = formData.get('photo');
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append('file', file);
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: cloudflareForm,
    });
    console.log(await response.text());
    if (response.status !== 200) {
      return;
    }
    const photoUrl = `https://imagedelivery.net/2YRH3jpkhrWOOYZOL3zGhA/${photoId}`;
    formData.set('photo', photoUrl);
    return SaveBabyProfile(prevState, formData);
  };

  return (
    <>
      <label
        className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover w-96"
        htmlFor="profileImage"
        style={{
          backgroundImage: `url(${preview})`,
          zIndex: 1,
        }}
      >
        {preview ? null : <PhotoIcon className="size-10" />}
      </label>
      <input
        onChange={onChangeImage}
        type="file"
        className="hidden"
        name="photo"
        accept="image/*"
        id="profileImage"
      />
    </>
  );
}
