import db from '@/lib/db';
import MomsLogo from '@/lib/logo';
import getSession from '@/lib/session';
import {
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';

async function getBabyProfile(userId: number) {
  const babyProfiles = await db.babyProfile.findMany({
    where: {
      userId: userId, // userId로 검색
    },
    select: {
      nickName: true,
      babyGender: true,
    },
  });
  // 첫 번째 결과를 반환하거나 null을 반환합니다.
  return babyProfiles.length > 0 ? babyProfiles[0] : null;
}

export default async function MainTopBar() {
  const session = await getSession();
  console.log(session.id!);
  const babyProfile = await getBabyProfile(session.id!);

  console.log(babyProfile);
  return (
    <div className=" pt-5 flex flex-col gap-2 bg-white w-full h-28 border border-b-2 pb-10 px-20 fixed top-0 left-0 right-0 z-50">
      <div className="flex flex-row justify-between">
        <Link href="/home">
          <MomsLogo />
        </Link>
        <div className="flex flex-row gap-6 items-center rounded-full border-4  border-orange-300 bg-opacity-40 px-5 py-1">
          <div className="flex flex-row items-center gap-2">
            {babyProfile?.babyGender === '남자' ? (
              <FontAwesomeIcon icon={faMars} className="text-blue-500 size-6" />
            ) : (
              <FontAwesomeIcon
                icon={faVenus}
                className="text-pink-500 size-6"
              />
            )}
            <h1 className="text-black ">{babyProfile?.nickName!}</h1>
          </div>
          <Link href="/cart">
            <HeartIcon className="size-8" />
          </Link>
          <Link href="/myProfile">
            <UserIcon className="size-8" />
          </Link>
        </div>
      </div>

      <div className="flex flex-row gap-8 *:text-sm font-semibold">
        <Link href="/products/markets">
          <h1 className="mainTap">맘스 마켓</h1>
        </Link>
        <Link href="/products/shareOrsell">
          <h1 className="mainTap">맘스 장터</h1>
        </Link>
        <Link href="/chats">
          <h1 className="mainTap">맘스 톡톡</h1>
        </Link>
        <Link href="/posts">
          <h1 className="mainTap">맘스 속닥속닥</h1>
        </Link>
        <Link href="/photos">
          <h1 className="mainTap">우리 아이의 사진첩</h1>
        </Link>
      </div>
    </div>
  );
}
