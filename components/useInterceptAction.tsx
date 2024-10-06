import SaveBabyProfile from '@/app/profile/actions';

export const useInterceptAction = (
  uploadUrl: string,
  photoId: string,
  callback: Function
) => {
  const interceptAction = async (prevState: any, formData: FormData) => {
    const file = formData.get('photo');
    if (!file) {
      return;
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append('file', file as Blob);

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

    return callback(prevState, formData);
  };

  return interceptAction;
};
