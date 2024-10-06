'use server';
import db from '@/lib/db';

export async function getPosts(category: string) {
  console.log('Fetching posts for category:', category);
  const posts = await db.post.findMany({
    where: {
      category,
    },
    select: {
      title: true,
      description: true,
      id: true,
      views: true,
      createdAt: true,
      photo: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  console.log(posts);
  return posts;
}
