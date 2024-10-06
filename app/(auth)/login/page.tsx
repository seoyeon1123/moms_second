'use client';

import Link from 'next/link';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import LoginAction from './actions';
import FooterInfo from '@/components/FooterInfo';

export default function LoginPage() {
  const [state, action] = useFormState(LoginAction, null);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-10 px-4">
      <h1 className="text-3xl font-bold text-left w-full max-w-md ">로그인</h1>
      <form className="w-full max-w-md flex flex-col gap-5" action={action}>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">아이디</h3>
          <Input
            type="text"
            placeholder="Username"
            required
            name="username"
            errors={state?.fieldErrors.username}
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">비밀번호</h3>
          <Input
            type="password"
            placeholder="Password"
            required
            name="password"
            errors={state?.fieldErrors.password}
          />
        </div>
        <button className="btn w-full">로그인</button>
      </form>
      <hr className="w-full max-w-md h-px bg-neutral-900" />
      <div className="flex flex-row justify-between gap-4 items-center *:text-sm pt-0">
        <Link href="/signup" className="font-semibold text-orange-600">
          회원가입
        </Link>
        <span>|</span>
        <Link href="/account/find-username">아이디 찾기</Link>
        <span>|</span>
        <Link href="/account/find-password">비밀번호 찾기</Link>
      </div>
    </div>
  );
}
