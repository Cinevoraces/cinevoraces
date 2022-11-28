import React from 'react';
import Image from 'next/image';
import defaultUserPic from '@public/icons/user_default.svg';
import Rate from '@components/Rate';

interface PostCardProps {
  type: 'presentation' | 'comment';
  author_avatar: string;
  author_pseudo: string;
  author_role: string;
  presentation?: string;
  publishing_date?: string;
  comment?: string;
  rating?: number;
  created_at?: string;
}

export default function PostCardProps({
  type,
  author_avatar,
  author_pseudo,
  author_role,
  presentation,
  publishing_date,
  comment,
  rating,
  created_at,
}: PostCardProps) {
  return (
    <div
      id={type === 'presentation' ? 'presentation-card' : 'comment-card'}
      className="w-full p-3 rounded-xl drop-shadow-sm bg-medium-gray flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div
          id="card-header"
          className="flex gap-2">
          <Image
            src={author_avatar ? author_avatar : defaultUserPic}
            alt={`avatar de ${author_pseudo}`}
            height={50}
            width={50}
            className="border border-white rounded-full"
          />
          <div
            id="post-infos"
            className="flex flex-col justify-between">
            <p className="text-lg font-medium">{author_pseudo}</p>
            <p className="text-xs">
              {publishing_date
                && new Date(publishing_date.slice(0, 10)).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              {created_at &&
                new Date(created_at.slice(0, 10)).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
            </p>
          </div>
        </div>
        {rating && <Rate rate={rating} />}
      </div>
      <p className="w-full">{presentation ? presentation : comment}</p>
    </div>
  );
}
