'use client';

import { useState } from 'react';
import Input from '@/components/input';
import MomsLogo from '@/lib/logo';
import db from '@/lib/db';
import { checkEmail } from './actions';
import Link from 'next/link';

export default function FindUsername() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await checkEmail(email);
      if (user) {
        setUsername(user.username);
      } else {
        setError('사용자를 찾을 수 없습니다.');
        setUsername(null);
      }
    } catch (err) {
      setError('오류가 발생했습니다. 다시 시도해 주세요.');
      setUsername(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex flex-col justify-start w-full max-w-md h-screen gap-10 px-4 mt-80">
      {username ? (
        <>
          <p className="mt-4 text-2xl border-2 p-3 rounded-full bg-white text-center">
            아이디는 {username} 입니다
          </p>
          <div className="flex flex-row justify-between items-center">
            <div>
              <p className="flex flex-row items-center justify-between gap-2">
                <Link
                  href="/account/find-password"
                  className="text-lg text-orange-500 font-semibold"
                >
                  비밀번호
                </Link>
                찾으시러 가실래요 ?{' '}
              </p>
            </div>
            <p className="bg-orange-500 rounded-2xl p-1"> OR</p>
            <div>
              <p className="flex flex-row items-center justify-between gap-2">
                <Link
                  href="/login"
                  className="text-lg text-orange-500 font-semibold"
                >
                  로그인
                </Link>
                하러 가실래요 ?{' '}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start text-start space-y-2">
            <h1 className="text-3xl font-semibold">아이디 찾기</h1>
            <p className="text-gray-600">
              엄마들에 가입한 이메일을 입력해주세요
            </p>
          </div>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                className="w-full min-w-[350px] bg-white border-2 rounded-lg border-neutral-200 py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 ease-in-out"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn w-full" disabled={loading}>
              {loading ? '로딩 중...' : '다음'}
            </button>
          </form>
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}
