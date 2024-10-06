'use client';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { getProduct } from '@/app/(tab)/products/markets/action';
import { NaverProduct } from '@/types/NaverProduct';

interface ProductSearchFormProps {
  setProducts: (products: NaverProduct[]) => void;
  setQuery: (data: string) => void;
}

export default function ProductSearchForm({
  setProducts,
  setQuery,
}: ProductSearchFormProps) {
  const [product, setProduct] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.trim()) {
      console.error('검색어가 비어있습니다.');
      return;
    }
    try {
      setProducts([]);
      const data = await getProduct({ query: product, offset: 1 });
      setProducts(data);
      setQuery(product);
    } catch (error) {
      console.error('제품 검색 중 오류 발생:', error);
    }
  };

  return (
    <form
      className="flex flex-row justify-end items-center"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        required
        name="product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="px-5 py-1 rounded-full focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all duration-200 ease-in-out focus:outline-none"
      />
      <button type="submit">
        <MagnifyingGlassCircleIcon className="size-8 text-orange-600" />
      </button>
    </form>
  );
}
