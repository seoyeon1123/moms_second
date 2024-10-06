'use server';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import z, { nullable } from 'zod';

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  photo: z.string().optional().nullable(), // photo 필드는 선택 사항
  category: z.string(),
});

export default async function PostAddAction(
  prevState: any,
  formData: FormData
) {
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    photo: formData.get('photo')?.toString() || null,
    category: formData.get('category'),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error;
  }

  const session = await getSession();

  await db.post.create({
    data: {
      userId: session.id!,
      title: result.data.title,
      description: result.data.description,
      photo: result.data.photo ? result.data.photo : null,
      category: result.data.category,
    },
  });

  redirect('/posts');
}
