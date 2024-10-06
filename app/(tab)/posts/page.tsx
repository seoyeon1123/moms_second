'use client';

import SelectPostCategory from '@/components/SelectorPostCategory';
import { formatToTime } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getPosts } from './actions';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface IUser {
  username: string;
}

interface IPost {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  views: number;
  photo: string | null;
  user: IUser;
}

export default function Posts() {
  const [selectCategory, setSelectCategory] = useState('육아팁');
  const [newPosts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts(selectCategory);
        console.log('Current selected category:', selectCategory);
        console.log('Fetched posts:', data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [selectCategory]);

  // 현재 페이지에 해당하는 포스트 가져오기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = newPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 수 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(newPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="mx-auto px-10">
        <div className="flex flex-row justify-between my-5">
          <SelectPostCategory setSelectCategory={setSelectCategory} />
          <Link href="/posts/add">
            <PencilSquareIcon className="size-8 text-orange-600" />
          </Link>
        </div>
        <table className="min-w-full border-collapse ">
          <thead>
            <tr className="bg-orange-500 text-white border-b border-gray-200 *:text-center">
              <th className="border border-gray-200 px-4 py-3 text-center">
                번호
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left w-[900px]">
                제목
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left">
                작성자
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left">
                작성일
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left">
                조회
              </th>
            </tr>
          </thead>

          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <tr key={post.id} className="bg-white text-center">
                  <td className="border border-gray-200 px-4 py-2">
                    <Link href={`/posts/${post.id}`}>{post.id}</Link>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 font-bold">
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <Link href={`/posts/${post.id}`}>{post.user.username}</Link>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <Link href={`/posts/${post.id}`}>
                      {formatToTime(post.createdAt.toString())}
                    </Link>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <Link href={`/posts/${post.id}`}>{post.views}</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="border border-gray-200 px-4 py-2 text-center"
                >
                  게시물이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        {/* <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`mx-1 px-4 py-2 border rounded ${
                currentPage === number
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-orange-500'
              }`}
            >
              {number}
            </button>
          ))}
        </div> */}
      </div>
    </>
  );
}
