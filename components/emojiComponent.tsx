'use client';

import fetchEmojis, {
  IEmojiProps,
  fetchCategories,
  ICategoryProps,
} from '@/lib/emojiApi';
import { FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

interface EmojiComponentProps {
  onEmojiSelect: (emoji: string) => void; // 이모지 선택 시 실행될 함수
}

export default function EmojiComponent({ onEmojiSelect }: EmojiComponentProps) {
  const [emojis, setEmojis] = useState<IEmojiProps[]>([]);
  const [filteredEmojis, setFilteredEmojis] = useState<IEmojiProps[]>([]);
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showEmojiList, setShowEmojiList] = useState(false);
  const emojiListRef = useRef<HTMLDivElement>(null);
  const [clickIcon, setClickIcon] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emojiData, categoryData] = await Promise.all([
          fetchEmojis(),
          fetchCategories(),
        ]);
        setEmojis(emojiData);
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const filtered = category
      ? emojis.filter((emoji) => emoji.group === category)
      : [];
    setFilteredEmojis(filtered);
    if (category) {
      setShowEmojiList(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiListRef.current &&
        !emojiListRef.current.contains(event.target as Node) &&
        !document.getElementById('category')?.contains(event.target as Node)
      ) {
        setShowEmojiList(false);
        setClickIcon(false); // 셀렉터 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiListRef]);

  if (loading)
    return (
      <p>
        <FaceFrownIcon className="size-8" />
      </p>
    );
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="relative flex flex-row">
        <label htmlFor="category" className="">
          <FaceSmileIcon
            className="size-8"
            onClick={() => setClickIcon(true)}
          />
        </label>
        {clickIcon && (
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            onClick={() => setShowEmojiList(false)}
            onBlur={() => setShowEmojiList(true)}
          >
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.slug}
              </option>
            ))}
          </select>
        )}
      </div>
      {showEmojiList && filteredEmojis.length > 0 && (
        <div
          ref={emojiListRef}
          className="overflow-y-auto max-h-52 z-50 bg-neutral-500 rounded-xl absolute p-2"
        >
          <ul className="grid grid-cols-12 cursor-pointer gap-2">
            {filteredEmojis.map((emoji, index) => (
              <li
                key={index}
                className="text-xl"
                onClick={() => onEmojiSelect(emoji.character)} // 이모지 선택 시 호출
              >
                {emoji.character}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
