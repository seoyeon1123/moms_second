'use client';

import MomsLogo from '@/lib/logo';
import { useState } from 'react';
import { checkPassword, UpdatePassword } from './actions';
import Link from 'next/link';

export default function FindPassword() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState<string | null>('');
  const [confirmPassword, setConfirmPassword] = useState<string | null>('');
  const [error, setError] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false); // 추가된 상태

  // 비밀번호 찾기 제출
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      const user = await checkPassword(username); // 사용자가 있는지 확인
      if (user) {
        setResetMode(true); // 사용자가 있으면 비밀번호 재설정 모드로 전환
      } else {
        setError('사용자를 찾을 수 없습니다.');
      }
    } catch (err) {
      setError('오류가 발생했습니다. 다시 시도하세요.');
    }
  };

  const handleUpdateSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await UpdatePassword(username, password!);
      setResetSuccess(true);
      //setResetMode(false);
    } catch (err) {
      setError('비밀번호 재설정에 실패했습니다.');
    }
  };

  return (
    <div className="mx-auto flex flex-col justify-start w-full max-w-md h-screen gap-10 px-4 mt-80">
      {resetMode ? (
        <div className="flex flex-col items-start gap-5 w-full max-w-md p-5">
          <p className="text-lg font-semibold">
            ✚ 새로운 비밀번호를 입력하세요.
          </p>
          <form
            onSubmit={handleUpdateSubmit}
            className="flex flex-col gap-4 w-full"
          >
            <input
              className="w-full bg-white border-2 rounded-lg border-neutral-200 py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 ease-in-out"
              type="password"
              placeholder="비밀번호 재설정"
              required
              name="password"
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full bg-white border-2 rounded-lg border-neutral-200 py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 ease-in-out"
              type="password"
              placeholder="비밀번호 재설정 확인"
              required
              name="confirmPassword"
              value={confirmPassword || ''}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="btn w-full" type="submit">
              비밀번호 재설정
            </button>
          </form>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          {resetSuccess && (
            <div className="mt-4 w-full flex flex-col items-center text-center justify-center gap-2">
              <p className="text-lg text-red-600 font-semibold">
                비밀번호가 성공적으로 재설정되었습니다.
              </p>
              <div className="flex flex-row gap-4 items-center">
                <p>로그인 하러 가시겠습니까?</p>
                <Link
                  href="/login"
                  className="bg-orange-600 text-sm px-3 py-1.5 rounded-full text-white"
                >
                  로그인
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-5 w-full max-w-md p-5">
          <h1 className="text-3xl font-semibold">비밀번호 찾기</h1>
          <p>엄마들에 가입한 아이디를 입력하세요</p>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              placeholder="아이디"
              required
              name="username"
              value={username}
              className="w-full bg-white border-2 rounded-lg border-neutral-200 py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 ease-in-out"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="btn w-full mt-4">
              다음
            </button>
          </form>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
}
