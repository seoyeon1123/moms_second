import { ClockIcon, BellIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function AlarmSetting() {
  return (
    <>
      <div className="bg-yellow-50 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
        <h1 className="text-3xl font-semibold text-center text-brown-800 mb-4">
          알람 설정
        </h1>

        <div className="flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-inner mb-4">
          <div className="text-left">
            <p className="text-xl text-brown-600">현재 알람</p>
            <p className="text-4xl font-bold text-orange-800 mt-2">08:00 AM</p>
          </div>

          <div className="mx-4">
            <ClockIcon className="w-16 h-16 text-orange-500" />
          </div>

          <div className="text-right">
            <p className="text-xl text-brown-600">알람 상태</p>
            <p className="text-4xl font-bold text-orange-500 mt-2">활성화</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-inner mb-4">
          <h2 className="text-2xl font-semibold text-center text-brown-800 mb-2">
            알람 설정하기
          </h2>
          <form className="flex flex-col items-center">
            <input
              type="time"
              className="border border-brown-300 p-2 rounded-lg mb-2"
              defaultValue="08:00"
            />
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 transition duration-200">
              알람 추가
            </button>
          </form>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-inner mb-4">
          <h2 className="text-2xl font-semibold text-center text-brown-800 mb-2">
            알람 목록
          </h2>
          <div className="flex flex-col text-brown-600">
            <p className="text-lg">08:00 AM</p>
            <p className="text-lg">09:30 AM</p>
            <p className="text-lg">10:45 AM</p>
          </div>
        </div>

        {/* 하단바 추가 */}
        <div className="flex justify-around mt-6">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 transition duration-200">
            <BellIcon className="w-6 h-6" />
          </button>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 transition duration-200">
            <ClockIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
}
