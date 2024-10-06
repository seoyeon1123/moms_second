'use server';

import db from '@/lib/db';
import bcrypt from 'bcrypt';

// 사용자가 있는지 확인하는 함수
export async function checkPassword(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return user; // 사용자가 있으면 반환, 없으면 null 반환
}

// 비밀번호를 업데이트하는 함수
export async function UpdatePassword(username: string, password: string) {
  // 비밀번호를 해시화
  const hashedPassword = await bcrypt.hash(password, 10);

  // 데이터베이스에서 사용자 비밀번호 업데이트
  const user = await db.user.update({
    where: {
      username,
    },
    data: {
      password: hashedPassword, // 해시된 비밀번호로 업데이트
    },
    select: {
      id: true,
    },
  });

  return user;
}
