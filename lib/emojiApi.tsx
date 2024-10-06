// lib/emojiApi.js

export interface IEmojiProps {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
}

export interface ICategoryProps {
  slug: string;
  subCategories: string[];
}

const API_URL = 'https://emoji-api.com'; // 예시 URL, 실제 API URL로 변경

export async function fetchCategories(): Promise<ICategoryProps[]> {
  try {
    const response = await fetch(
      `${API_URL}/categories?access_key=e0abddc9ce53044a71884add08f1242db8289e0b`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: ICategoryProps[] = await response.json();
    return data; // 카테고리 데이터 반환
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
}

export default async function fetchEmojis(): Promise<IEmojiProps[]> {
  try {
    const response = await fetch(
      `${API_URL}/emojis?access_key=e0abddc9ce53044a71884add08f1242db8289e0b`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: IEmojiProps[] = await response.json();
    return data; // 이모지 데이터 반환
  } catch (error) {
    console.error('Failed to fetch emojis:', error);
    throw error;
  }
}
