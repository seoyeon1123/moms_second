import Link from 'next/link';
import MomsLogo from '../lib/logo';

export default function AuthTopBar() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-24 pt-3">
        <div className="flex flex-row justify-around mt-4 mb-2">
          <div className="flex flex-row justify-center items-center gap-6">
            <MomsLogo />
            <h1 className="font-semibold text-lg">엄마들</h1>
          </div>
          <div className="flex flex-row gap-2 text-center">
            <Link
              href="/account/signup"
              className="w-24 p-2 bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 rounded-lg"
            >
              회원가입
            </Link>
            <Link
              href="/login"
              className="w-24 p-2 border-2 border-orange-500 text-orange-500  rounded-lg transition-all duration-300"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
