'use server';
import z from 'zod';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';
import db from '@/lib/db';

const formSchema = z.object({
  photo: z.string({ required_error: '사진을 저장해주세요' }),
  name: z.string({ required_error: '아이의 이름을 입력해주세요' }),
  age: z.string({ required_error: '아이의 나이를 선택해주세요' }),
  gender: z.string({ required_error: '아이의 성별을 선택해주세요' }),
  nickname: z.string({
    required_error: '우리 아이의 특징이 담긴 별명이 궁금해요',
  }),
});

export default async function SaveBabyProfile(
  prevState: any,
  formData: FormData
) {
  const data = {
    photo: formData.get('photo'),
    name: formData.get('name'),
    age: formData.get('age-group'),
    gender: formData.get('gender'),
    nickname: formData.get('nickname'),
  };

  console.log('Received data:', data);

  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error.flatten());
    return result.error.flatten(); // 오류 메시지를 반환하여 클라이언트에서 처리
  } else {
    const session = await getSession();
    const babyProfile = await db.babyProfile.create({
      data: {
        babyImage: result.data.photo,
        babyname: result.data.name,
        babyAge: result.data.age,
        babyGender: result.data.gender,
        nickName: result.data.nickname,
        user: {
          connect: {
            id: session.id!,
          },
        },
      },
      select: {
        id: true,
      },
    });

    console.log(babyProfile);
    redirect('/home');
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'post',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
