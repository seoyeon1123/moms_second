'use server';

import db from '@/lib/db';

export async function checkEmail(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      username: true,
      id: true,
    },
  });

  return user;
}
