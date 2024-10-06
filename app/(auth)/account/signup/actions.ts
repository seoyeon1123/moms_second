'use server';

import db from '../../../../lib/db';
import z from 'zod';
import getSession from '../../../../lib/session';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

const checkPassword = ({
  password,
  comfirmPassword,
}: {
  password: string;
  comfirmPassword: string;
}) => password === comfirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        required_error: '아이디는 필수값 입니다. ',
      })
      .min(3, '아이디는 3글자 이상으로 입력해주세요.')
      .max(10, '아이디는 10글지 이하로 입력해주세요. ')
      .trim()
      .toLowerCase(),
    email: z
      .string({
        required_error: '이메일은 필수값 입니다. ',
      })
      .email()
      .trim(),
    password: z
      .string({
        required_error: '비밀번호는 필수값 입니다. ',
      })
      .min(5, '비밀번호는 5글자 이상으로 입력해주세요.'),
    comfirmPassword: z
      .string({ required_error: '비밀번호는 필수값 입니다. ' })
      .min(5, '비밀번호는 5글자 이상으로 입력해주세요.'),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '아이디가 이미 존재합니다. ',
        path: ['username'],
        fatal: true,
      });
      z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이메일이 이미 존재합니다. ',
        path: ['email'],
        fatal: true,
      });
      z.NEVER;
    }
  })
  .refine(checkPassword, {
    message: '입력하신 비밀번호가 틀립니다.',
    path: ['comfirmPassword'],
  });

export default async function createSignup(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    comfirmPassword: formData.get('comfirmPassword'),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect('/profile');
  }
}

//비밀번호 password = comfirmPassword 같은지
//username이 이미 가입이 되어있는지
//email이 이미 가입이 되어있는지 확인
