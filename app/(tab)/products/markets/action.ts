import { GetProductParams } from './page';

interface IProduct {
  query: string;
}

export async function getProduct({ query, offset = 0 }: GetProductParams) {
  // 쿼리 인자 추가
  const response = await fetch(
    `/v1/search/shop.json?query=${encodeURIComponent(
      query
    )}&display=12&offset=${offset}&start=${offset}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_SHOPPING_CLIENT_ID!,
        'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data.items);
  return data.items; // items를 반환
}
