import { ClockIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Weather() {
  return (
    <>
      <div className="bg-yellow-50 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
        <h1 className="text-3xl font-semibold text-center text-brown-800 mb-4">
          오늘의 날씨
        </h1>

        <div className="flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-inner mb-4">
          <div className="text-left">
            <p className="text-xl text-brown-600">서울의 날씨</p>
            <p className="text-4xl font-bold text-orange-800 mt-2">2°C</p>
          </div>

          <div className="mx-4">
            <Image
              src="/sun-159392_1280.png"
              alt="해"
              width={100}
              height={100}
            />
          </div>

          <div className="text-right">
            <p className="text-xl text-brown-600">오늘의 날씨</p>
            <p className="text-4xl font-bold text-orange-500 mt-2">맑음</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold text-center text-brown-800 mb-2">
            추가 정보
          </h2>
          <div className="flex justify-between text-brown-600">
            <div className="text-center">
              <p className="text-lg">오늘의 강수량:</p>
              <Image
                src="/drop-159527_1280.png"
                alt="물"
                width={100}
                height={100}
              />
              <p className="text-xl font-bold">0 mm</p>
            </div>
            <div className="text-center">
              <p className="text-lg">오늘의 일조량:</p>
              <Image
                src="/emoji-2740860_1280.png"
                alt="일조량"
                width={100}
                height={100}
              />
              <p className="text-xl font-bold">8 시간</p>
            </div>
          </div>
        </div>

        {/* 옷 추천 섹션 추가 */}
        <div className="bg-white p-4 rounded-lg shadow-inner mt-4">
          <h2 className="text-2xl font-semibold text-center text-brown-800 mb-2">
            오늘의 옷 추천
          </h2>
          <div className="flex flex-col items-center text-brown-600">
            <p className="text-lg mb-1">
              긴팔: <span className="font-bold">추천합니다!</span>
            </p>
            <p className="text-lg mb-1">
              반팔: <span className="font-bold">가능합니다.</span>
            </p>
            <p className="text-lg mb-1">
              바지: <span className="font-bold">추천합니다!</span>
            </p>
          </div>
        </div>

        {/* 하단바 추가 */}
        <div className="flex justify-around mt-6">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 transition duration-200">
            <ClockIcon className="w-6 h-6" />
          </button>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 transition duration-200">
            <GlobeAsiaAustraliaIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
}
