'use client';

import {
  getBabyProfile,
  getProductCategory,
} from '@/app/(tab)/products/shareOrsell/actions';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

export default function ProductList({
  setProductId,
  selectCategory,
  setNickName,
  showThreeColumns,
}: {
  setProductId: (id: string) => void;
  setNickName: (nickname: string) => void;
  selectCategory: string;
  showThreeColumns: boolean;
}) {
  const [products, setProducts] = useState<any[]>([]);
  const [babyProfile, setBabyProfile] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = showThreeColumns ? 12 : 8;

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProductCategory(selectCategory);
      setProducts(productsData);

      const babyProfileData = await getBabyProfile();
      setBabyProfile(babyProfileData);
      setNickName(babyProfileData?.nickName!);
    };

    if (selectCategory) {
      fetchData();
    }
  }, [selectCategory]);

  const handleNext = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col min-h-[738px] ">
      <div
        className={`flex-wrap justify-start flex-grow grid ${
          showThreeColumns
            ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-4'
            : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6'
        } gap-2`}
      >
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col p-2 justify-start items-center"
            onClick={() => setProductId(product.id)}
          >
            <div className="flex flex-col items-center justify-evenly text-center p-2 hover:scale-105 transition-transform ease-in-out duration-200 bg-white shadow-md rounded-lg h-[320px] ">
              <Image
                src={`${product.photo}/public`}
                alt={product.title}
                width={230}
                height={230}
                className="aspect-square object-cover rounded-xl"
              />
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row gap-2 p-2 items-center">
                  <h1 className="text-sm font-bold  max-w-[16ch] break-words">
                    {product.title}
                  </h1>
                  {product.share && (
                    <h1 className="text-sm bg-orange-600 px-2 rounded-full text-white">
                      나눔중
                    </h1>
                  )}
                </div>
                <div className="flex flex-row gap-1 text-sm">
                  <h1 className="text-orange-600 font-bold">
                    {babyProfile?.nickName}{' '}
                  </h1>
                  <span>moms</span>
                  <Image
                    src="/딸랑이.png"
                    alt="딸랑이"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <button
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md mr-2 "
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          <ChevronLeftIcon className="w-7 h-7 text-orange-600 active:text-orange-800" />
        </button>
        <button
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md "
          onClick={handleNext}
          disabled={(currentPage + 1) * ITEMS_PER_PAGE >= products.length}
        >
          <ChevronRightIcon className="w-7 h-7 text-orange-600 active:text-orange-800" />
        </button>
      </div>
    </div>
  );
}
