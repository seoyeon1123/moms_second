'use server';

import z from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import getSession from '@/lib/session';

const checkUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  username: z
    .string({
      required_error: '아이디는 필수값입니다.',
    })
    .refine(checkUsername, '존재하지 않는 아이디입니다. '),
  password: z.string({
    required_error: '비밀번호는 필수값입니다.',
  }),
});

export default async function LoginAction(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        username: result.data.username,
      },
      select: {
        password: true,
        id: true,
      },
    });

    const passwordOk = await bcrypt.compare(
      result.data.password,
      user?.password!
    );

    if (passwordOk) {
      const session = await getSession();
      session.id = user?.id;
      await session.save();
      const babyProfile = await db.babyProfile.findMany({
        where: {
          userId: session.id!,
        },
        select: {
          id: true,
        },
      });

      if (!babyProfile) {
        redirect('/profile');
      } else {
        redirect('/home');
      }
    } else {
      return {
        fieldErrors: {
          password: ['비밀번호가 일치하지 않습니다. '],
          username: [],
        },
      };
    }
  }
}
