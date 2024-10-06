'use client';

import Input from '@/components/input';
import MomsLogo from '../../../../lib/logo';
import { useFormState } from 'react-dom';
import createSignup from '@/app/(auth)/account/signup/actions';

export default function SignUp() {
  const [state, action] = useFormState(createSignup, null);
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-10 px-4">
        <div className=" flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-left w-full max-w-md pt-10">
            회원가입
          </h1>
          <p>
            본인의 이름과 휴대전화번호 및 이메일을 모두 정확하게 입력해 주세요.
          </p>
        </div>
        <form className="w-full max-w-md flex flex-col gap-4" action={action}>
          <div>
            <h3 className="pb-2">아이디</h3>
            <Input
              type="text"
              placeholder="아이디"
              required
              name="username"
              errors={state?.fieldErrors.username}
            />
          </div>
          <div>
            <h3 className="pb-2">이메일</h3>
            <Input
              type="email"
              placeholder="이메일"
              required
              name="email"
              errors={state?.fieldErrors.email}
            />
          </div>
          <div>
            <h3 className="pb-2">비밀번호</h3>
            <Input
              type="password"
              placeholder="비밀번호"
              required
              name="password"
              errors={state?.fieldErrors.password}
            />
          </div>
          <div>
            <h3 className="pb-2">비밀번호 확인</h3>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              required
              name="comfirmPassword"
              errors={state?.fieldErrors.comfirmPassword}
            />
          </div>
          <button className="btn mt-5">회원가입 하기</button>
        </form>
      </div>
    </>
  );
}
