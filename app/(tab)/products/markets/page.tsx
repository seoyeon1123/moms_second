'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NaverProduct } from '@/types/NaverProduct';
import { getProduct } from './action';
import ProductSearchForm from '@/components/ProductSearch';
import { formatToWon } from '@/lib/utils';
import MarketLoading from './loading';

export interface GetProductParams {
  query: string;
  offset?: number;
}

const HomePage = () => {
  const [products, setProducts] = useState<NaverProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 첫 로딩 상태
  const [isPageLoading, setIsPageLoading] = useState(false);
  const productNum = 15;

  const [query, setQuery] = useState('');

  const fetchProducts = async (
    query: string,
    page: number,
    isInitialLoad = false
  ) => {
    if (isInitialLoad) {
      setIsLoading(true);
    } else {
      setIsPageLoading(true);
    }
    try {
      console.log('Fetching products...');
      const data = await getProduct({ query, offset: page * productNum });
      if (data.length > 0) {
        setProducts((prevProducts) => {
          const existingProductIds = new Set(
            prevProducts.map((product) => product.productId)
          );
          const newProducts = data.filter(
            (product: NaverProduct) =>
              !existingProductIds.has(product.productId)
          );

          const totalProducts = newProducts.slice(0, 10);
          return [...prevProducts, ...totalProducts];
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      } else {
        setIsPageLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProducts('유아모자', 1, true);
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(query, currentPage);
    }
  }, [currentPage]);

  const cleanTitle = (title: string) => {
    return title.replace(/<\/?b>/g, '');
  };

  const cleanedProducts = products.map((product) => ({
    ...product,
    title: cleanTitle(product.title),
  }));

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      {isLoading ? (
        <MarketLoading />
      ) : (
        <div className="flex flex-col text-center px-20">
          <div className=" flex flex-row justify-between items-center mx-5 mb-5">
            {query ? (
              <h1 className="text-3xl">
                우리 엄마가 찾은
                <strong className="font-semibold text-orange-600">
                  {query}
                </strong>{' '}
                입니다.{' '}
              </h1>
            ) : (
              <h1 className="text-3xl">" 엄마 ~ 검색해주세요 "</h1>
            )}
            <ProductSearchForm setProducts={setProducts} setQuery={setQuery} />
          </div>
          <ul className="flex flex-wrap justify-center">
            {cleanedProducts.map((product) => (
              <li key={product.productId} className="w-1/5 p-4 grid-cols-5">
                <Link
                  className="flex flex-col items-center justify-evenly text-center p-2  hover:scale-105 transition-transform ease-in-out duration-200 bg-white shadow-md rounded-lg h-[400px]"
                  href={product.link}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="aspect-square object-cover"
                  />
                  <div className="flex flex-col gap-2 pt-2 px-10">
                    <h2 className="font-semibold text-gray-800">
                      {product.title}
                    </h2>
                    <p className="text-sm text-orange-600">
                      {formatToWon(product.lprice)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center p-5">
            <button
              onClick={handleNextPage}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full px-7 py-2 transition-colors duration-300"
              disabled={isPageLoading}
            >
              {isPageLoading ? '로딩 중...' : '다음'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
