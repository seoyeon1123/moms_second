'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { unstable_cache as nextCache, revalidateTag } from 'next/cache';

export async function getProductCategory(selectCategory: string) {
  const products = await db.product.findMany({
    where: {
      category: selectCategory,
    },
    select: {
      id: true,
      title: true,
      description: true,
      photo: true,
      share: true,
      // 필요한 다른 필드들을 추가하세요
    },
  });

  return products; // 결과 반환
}

export async function getBabyProfile() {
  const session = await getSession();
  const babyProfiles = await db.babyProfile.findMany({
    where: {
      userId: session.id,
    },
    select: {
      nickName: true,
    },
  });
  return babyProfiles.length > 0 ? babyProfiles[0] : null;
}

export async function getProductDetail(id: number) {
  const product = await db.product.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    select: {
      title: true,
      description: true,
      photo: true,
      createdAt: true,
      share: true,
      price: true,
      category: true,
      userId: true,
      _count: {
        select: {
          like: true,
        },
      },
      views: true,
    },
  });
  return product;
}

export interface IUpdateLikeProps {
  userId: number;
  productId: number;
  id?: number; // id is optional
}

export async function likeProduct(productId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        productId,
        userId: session.id!,
      },
    });
  } catch (e) {}
}

export async function dislikeProduct(productId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          userId: session.id!,
          productId,
        },
      },
    });
  } catch (e) {}
}

export async function getLikeStatus(productId: number) {
  const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        productId,
        userId: session.id!,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      productId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}
