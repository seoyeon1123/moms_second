'use server';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import z from 'zod';

// Form Schema 정의
const formSchema = z.object({
  title: z
    .string({
      required_error: '제목을 입력해주세요',
    })
    .max(15, '15글자 미만으로 입력해주세요.'),
  description: z
    .string({
      required_error: '내용을 입력해주세요.',
    })
    .min(5, '내용을 자세하게 입력해주세요. 최소 10글자 입니다.')
    .max(20, '최대 15글자 입니다.'),

  photo: z.string({
    required_error: '사진을 필수적으로 추가해주세요.',
  }),
  category: z.string({
    required_error: '카테고리는 필수 선택입니다.',
  }),
  price: z.number().optional().nullable(), // 선택적 필드로 수정
  share: z.boolean().optional().nullable(), // 선택적 필드로 수정
});

export default async function AddAction(prevState: any, formData: FormData) {
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    photo: formData.get('photo'),
    category: formData.get('category'),
    price: formData.get('price')
      ? parseInt(formData.get('price') as string)
      : null,
    share: formData.get('share') === 'on' ? true : false, // null 대신 false로 처리
  };

  console.log('Submitted Data:', data);

  const result = formSchema.safeParse(data);
  console.log('Validation Result:', result.success, result.error);

  if (!result.success) {
    return result.error.flatten ? result.error.flatten() : result.error; // flatten() 체크
  }

  const session = await getSession();
  await db.product.create({
    data: {
      title: result.data.title,
      description: result.data.description,
      price: result.data.price,
      share: result.data.share,
      photo: result.data.photo,
      category: result.data.category,
      userId: session.id!,
    },
  });

  redirect('/products/shareOrsell');
}
