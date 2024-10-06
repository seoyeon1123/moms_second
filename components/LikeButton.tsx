'use client';

import { HeartIcon } from '@heroicons/react/24/outline';
import { useOptimistic } from 'react';
import {
  dislikeProduct,
  likeProduct,
} from '@/app/(tab)/products/shareOrsell/actions';

interface ILikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  productId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  productId,
}: ILikeButtonProps) {
  const [state, reduceFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => {
      return {
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked
          ? previousState.likeCount - 1
          : previousState.likeCount + 1, // +1을 적절히 수정
      };
    }
  );

  const onClick = async () => {
    // 현재 상태 기준으로 반대로 액션 수행
    reduceFn(null);
    if (isLiked) {
      await dislikeProduct(productId);
    } else {
      await likeProduct(productId);
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 transition-colors ${
        state.isLiked ? 'text-red-600' : 'text-black'
      }`}
    >
      {state.isLiked ? (
        <HeartIcon className="w-6 h-6 text-red-600" />
      ) : (
        <HeartIcon className="w-6 h-6 text-black" />
      )}
    </button>
  );
}
