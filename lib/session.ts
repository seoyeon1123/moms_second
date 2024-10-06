import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionContant {
  id?: number;
  //? -> 쿠키에 id가 없을 수 도 있음 -> 로그인 한 사용자만 id를 가지고 있기 때문
}

export default function getSession() {
  return getIronSession<SessionContant>(cookies(), {
    cookieName: 'moms-session',
    password: process.env.COOKIE_PASSWORD!,
  });
}
