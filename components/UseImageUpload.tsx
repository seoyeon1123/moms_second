// hooks/useImageUpload.ts
import { useState } from 'react';
import { getUploadUrl } from '@/app/profile/actions';

export const useImageUpload = () => {
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

  return { preview, uploadUrl, photoId, onChangeImage };
};
