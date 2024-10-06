'use client';

import Image from 'next/image';
import Link from 'next/link';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import LoginAction from './(auth)/login/actions';
import AuthTopBar from '@/components/AuthTopBar';

export default function MainPage() {
  const [state, action] = useFormState(LoginAction, null);
  return (
    <>
      <AuthTopBar />
      <div className="relative w-screen h-screen flex flex-row justify-center items-center gap-32">
        <div className="relative w-96 h-96">
          <Image
            fill
            src={`/엄마와_아이들.png`}
            alt="mom and baby"
            className="object-cover transition-transform spin-slow"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-orange-200 text-4xl font-bold text-outline text-center">
            아이와
            <br />
            함께
          </h1>
        </div>
        <div className="bottom-10 flex flex-col items-center gap-8">
          <div className="flex flex-col gap-5 mb-5">
            <p className="text-4xl font-semibold">아이, 우리와 함께 키워요</p>
            <h1 className="text-6xl font-bold">엄마들</h1>
          </div>
          <div className="flex flex-col gap-4">
            <form
              className="flex flex-col justify-center items-center gap-4 "
              action={action}
            >
              <Input
                type="text"
                placeholder="Username"
                required
                name="username"
                errors={state?.fieldErrors.username}
              />
              <Input
                type="password"
                placeholder="password"
                required
                name="password"
                errors={state?.fieldErrors.password}
              />
              <button className="btn">로그인</button>
            </form>
          </div>
          <div className="flex flex-row text-center *:text-sm gap-3">
            <Link
              href="/account/signup"
              className="text-sm text-orange-600 font-semibold"
            >
              회원가입하기
            </Link>
            <span>|</span>
            <Link href="/account/find-username">아이디 찾기</Link>
            <span>|</span>
            <Link href="/account/find-password">비밀번호 찾기</Link>
          </div>
        </div>
      </div>
    </>
  );
}
